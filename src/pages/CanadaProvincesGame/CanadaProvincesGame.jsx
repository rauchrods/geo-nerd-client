import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";
import SearchInput from "../../components/SearchInput/SearchInput";
import FoundList from "../../components/FoundList/FoundList";
import GameTimer from "../../components/GameTimer/GameTimer";
import HintModal from "../../components/HintModal/HintModal";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useScoreSaver } from "../../hooks/useScoreSaver";

const WIDTH = 960;
const HEIGHT = 600;

function CanadaProvincesGame() {
  const [geoData, setGeoData] = useState(null);
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [foundProvinces, setFoundProvinces] = useState([]);
  const [isError, setIsError] = useState(false);
  const [hintTarget, setHintTarget] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { timeLeft, isOver, formatted, addTime } = useGameTimer(
    location.state?.duration ?? null,
  );

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
      return;
    }
  }, [location.state, navigate]);

  useEffect(() => {
    fetch("/canada-states.json")
      .then((res) => res.json())
      .then((data) => {
        const geo = feature(data, data.objects.provinces);
        setGeoData(geo);
      });
  }, []);

  const pathFn = useMemo(() => {
    if (!geoData) return null;
    const projection = d3.geoMercator().fitSize([WIDTH, HEIGHT], geoData);
    return d3.geoPath().projection(projection);
  }, [geoData]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || !geoData || !search.trim() || isOver) return;
    const match = geoData.features.find(
      (f) => f.properties.NAME.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundProvinces.includes(match.properties.NAME)) {
      setFoundProvinces((prev) => [...prev, match.properties.NAME]);
      setScore((prev) => prev + 1);
      if (location.state?.mode === "survival") addTime(5);
      setSearch("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const total = geoData ? geoData.features.length : 13;

  useScoreSaver({
    isOver,
    score,
    total,
    game: "canada-provinces",
    duration: location.state?.duration ?? null,
    mode: location.state?.mode ?? "classic",
  });

  const isGameDone = isOver || (geoData && score === total);

  useEffect(() => {
    if (!isGameDone) return;
    const id = setTimeout(() => navigate("/leaderboard"), 3000);
    return () => clearTimeout(id);
  }, [isGameDone, navigate]);

  const handleHintConfirm = () => {
    if (!hintTarget) return;
    setFoundProvinces((prev) => [...prev, hintTarget]);
    setScore((prev) => prev - 1);
    setHintTarget(null);
  };

  return (
    <div className="container">
      <div className="game-header">
        <h1 className="game-header__title">
          Canada Provinces &amp; Territories
        </h1>
      </div>
      <div className="game-layout">
        <div className="game-left-panel">
          <p className="score">
            Score: {score} / {total}
          </p>
          <GameTimer formatted={formatted} isOver={isOver} timeLeft={timeLeft} />
          {!isOver && (
            <>
              <SearchInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsError(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter province or territory name and press Enter..."
                isError={isError}
              />
              <p className="tip">Tip: Click a region to reveal it as a hint (−1 point)</p>
            </>
          )}
          <FoundList items={foundProvinces} />
        </div>
        <div className="game-map-panel">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            {geoData &&
              pathFn &&
              geoData.features.map((d, i) => {
                const name = d.properties.NAME;
                const isFound = foundProvinces.includes(name);
                const isMatch =
                  !isFound &&
                  search &&
                  name.toLowerCase().includes(search.toLowerCase());

                return (
                  <path
                    key={i}
                    d={pathFn(d)}
                    className={
                      isFound ? "found" : isMatch ? "highlight" : "state"
                    }
                    onClick={() => {
                      if (!isFound && !isOver) setHintTarget(name);
                    }}
                  />
                );
              })}
          </svg>
        </div>
      </div>
      {hintTarget && (
        <HintModal
          onConfirm={handleHintConfirm}
          onCancel={() => setHintTarget(null)}
        />
      )}
    </div>
  );
}

export default CanadaProvincesGame;
