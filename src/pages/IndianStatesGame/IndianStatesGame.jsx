import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";
import SearchInput from "../../components/SearchInput/SearchInput";
import FoundList from "../../components/FoundList/FoundList";
import GameTimer from "../../components/GameTimer/GameTimer";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useScoreSaver } from "../../hooks/useScoreSaver";
import "./IndianStatesGame.css";

function IndianStatesGame() {
  const [geoData, setGeoData] = useState(null);
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [foundStates, setFoundStates] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { timeLeft, isOver, formatted } = useGameTimer(location.state?.duration ?? null);

  useEffect(() => {
    if (!location.state) { navigate("/", { replace: true }); return; }
  }, [location.state, navigate]);

  const pathFn = useMemo(() => {
    if (!geoData) return null;
    const projection = d3.geoMercator().fitSize([800, 800], geoData);
    return d3.geoPath().projection(projection);
  }, [geoData]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || !geoData || !search.trim() || isOver) return;
    const match = geoData.features.find(
      (f) => f.properties.st_nm.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundStates.includes(match.properties.st_nm)) {
      setFoundStates((prev) => [...prev, match.properties.st_nm]);
      setScore((prev) => prev + 1);
      setSearch("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetch("/india-states.json")
      .then((res) => res.json())
      .then((data) => {
        const geo = feature(data, data.objects.states);
        setGeoData(geo);
      });
  }, []);

  const total = geoData ? geoData.features.length : 36;

  useScoreSaver({ isOver, score, total, game: "indian-states", duration: location.state?.duration ?? null });

  return (
    <div className="container">
      <div className="game-header">
        <h1 className="game-header__title">Indian States</h1>
      </div>
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
            placeholder="Enter state name and press Enter..."
            isError={isError}
          />
          <p className="tip">Tip: Hover over a state to see its name</p>
        </>
      )}

      <div className="game-layout">
        <svg
          viewBox="0 0 800 800"
          style={{ width: "100%", maxWidth: 800, height: "auto" }}
        >
          {geoData &&
            pathFn &&
            geoData.features.map((d, i) => {
              const stateName = d.properties.st_nm;
              const isFound = foundStates.includes(stateName);
              const isMatch =
                !isFound &&
                search &&
                stateName.toLowerCase().includes(search.toLowerCase());

              return (
                <path
                  key={i}
                  d={pathFn(d)}
                  className={
                    isFound ? "found" : isMatch ? "highlight" : "state"
                  }
                >
                  <title>{stateName}</title>
                </path>
              );
            })}
        </svg>

        <FoundList items={foundStates} />
      </div>
    </div>
  );
}

export default IndianStatesGame;
