import { useTransition, useState, useEffect, useMemo } from "react";
import { FaTrophy, FaSortAmountDown, FaCalendarAlt } from "react-icons/fa";
import { GAME_LABELS, fetchLeaderboard } from "../../utils/firestore";
import "./LeaderboardPage.css";

const GAMES = Object.keys(GAME_LABELS);

function formatDuration(d) {
  if (!d) return "∞";
  return `${Math.floor(d / 60)}m`;
}

function formatTime(ts) {
  return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function LeaderboardPage() {
  const [activeGame, setActiveGame] = useState(GAMES[0]);
  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("score");
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchLeaderboard(activeGame, 20);
        setRows(data);
      } catch (e) {
        console.error(e);
        setRows([]);
      }
    });
  }, [activeGame]);

  const sortedRows = useMemo(() => {
    if (sortBy === "date") {
      return [...rows].sort((a, b) => {
        const ta = a.playedAt?.toMillis?.() ?? a.playedAt ?? 0;
        const tb = b.playedAt?.toMillis?.() ?? b.playedAt ?? 0;
        return tb - ta;
      });
    }
    return rows; // already sorted by score desc from Firestore
  }, [rows, sortBy]);

  return (
    <div className="lb-container">
      <div className="game-header">
        <h1 className="game-header__title">
          <FaTrophy className="lb-trophy" /> Leaderboard
        </h1>
      </div>

      {/* Game tabs */}
      <div className="lb-tabs">
        {GAMES.map((g) => (
          <button
            key={g}
            className={`lb-tab${activeGame === g ? " lb-tab--active" : ""}`}
            onClick={() => setActiveGame(g)}
          >
            {GAME_LABELS[g]}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="lb-sort">
        <button
          className={`lb-sort-btn${sortBy === "score" ? " lb-sort-btn--active" : ""}`}
          onClick={() => setSortBy("score")}
        >
          <FaSortAmountDown /> High Score
        </button>
        <button
          className={`lb-sort-btn${sortBy === "date" ? " lb-sort-btn--active" : ""}`}
          onClick={() => setSortBy("date")}
        >
          <FaCalendarAlt /> Recent
        </button>
      </div>

      {/* Table */}
      <div className="lb-table-wrap">
        {isPending ? (
          <p className="lb-empty">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="lb-empty">No scores yet — be the first! 🎯</p>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Score</th>
                <th>%</th>
                <th>Timer</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, i) => (
                <tr key={row.id} className={sortBy === "score" && i < 3 ? `lb-row--top${i + 1}` : ""}>
                  <td className="lb-rank">
                    {sortBy === "score"
                      ? i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1
                      : i + 1}
                  </td>
                  <td className="lb-player">
                    {row.photoURL && (
                      <img src={row.photoURL} alt="" className="lb-avatar" referrerPolicy="no-referrer" />
                    )}
                    <span>{row.displayName}</span>
                  </td>
                  <td className="lb-score">{row.score} / {row.total}</td>
                  <td className="lb-pct">{row.pct}%</td>
                  <td className="lb-dur">{formatDuration(row.duration)}</td>
                  <td className="lb-date">{formatTime(row.playedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
