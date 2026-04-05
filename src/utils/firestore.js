import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SCORES_COL = "scores";

/**
 * Save a completed game score.
 * @param {{ uid, displayName, photoURL, game, score, total, duration }} data
 */
export async function saveScore({ uid, displayName, photoURL, game, score, total, duration }) {
  await addDoc(collection(db, SCORES_COL), {
    uid,
    displayName,
    photoURL: photoURL ? photoURL : "https://www.gravatar.com/avatar/?d=mp&f=y",
    game,
    score,
    total,
    duration: duration ? duration : null,
    pct: Math.round((score / total) * 100),
    playedAt: Date.now(),
  });
}

/**
 * Fetch top N scores for a game, ordered by score desc then fastest time.
 */
export async function fetchLeaderboard(game, count = 20) {
  const q = query(
    collection(db, SCORES_COL),
    orderBy("score", "desc"),
    limit(100),
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((d) => d.game === game)
    .slice(0, count);
}

/**
 * Fetch top scores across all games (for a global board).
 */
export async function fetchGlobalLeaderboard(count = 50) {
  const q = query(
    collection(db, SCORES_COL),
    orderBy("pct", "desc"),
    orderBy("playedAt", "asc"),
    limit(count),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export const GAME_LABELS = {
  "indian-states": "Indian States",
  "districts": "State Districts",
  "world-countries": "World Countries",
  "usa-states": "US States",
  "canada-provinces": "Canada Provinces",
};

export const GAME_FLAGS = {
  "indian-states": "in",
  "districts": "in",
  "world-countries": null,
  "usa-states": "us",
  "canada-provinces": "ca",
};
