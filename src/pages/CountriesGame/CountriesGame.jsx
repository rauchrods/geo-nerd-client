import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";
import SearchInput from "../../components/SearchInput/SearchInput";
import FoundList from "../../components/FoundList/FoundList";
import GameTimer from "../../components/GameTimer/GameTimer";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useScoreSaver } from "../../hooks/useScoreSaver";
import "./CountriesGame.css";

const WIDTH = 980;
const HEIGHT = 550;

function CountriesGame() {
  const [geoData, setGeoData] = useState(null);
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [foundCountries, setFoundCountries] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { timeLeft, isOver, formatted, addTime } = useGameTimer(
    location.state?.duration,
  );

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
      return;
    }
  }, [location.state, navigate]);

  useEffect(() => {
    fetch("/world-countries.json")
      .then((res) => res.json())
      .then((data) => {
        const geo = feature(data, data.objects.countries);
        setGeoData(geo);
      });
  }, []);

  const pathFn = useMemo(() => {
    if (!geoData) return null;
    const projection = d3.geoNaturalEarth1().fitSize([WIDTH, HEIGHT], geoData);
    return d3.geoPath().projection(projection);
  }, [geoData]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || !geoData || !search.trim() || isOver) return;
    const match = geoData.features.find(
      (f) => f.properties.name.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundCountries.includes(match.properties.name)) {
      setFoundCountries((prev) => [...prev, match.properties.name]);
      setScore((prev) => prev + 1);
      if (location.state?.mode === "survival") addTime(5);
      setSearch("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const total = geoData ? geoData.features.length : 180;

  useScoreSaver({
    isOver,
    score,
    total,
    game: "world-countries",
    duration: location.state?.duration ?? null,
    mode: location.state?.mode ?? "classic",
  });

  const isGameDone = isOver || (geoData && score === total);

  useEffect(() => {
    if (!isGameDone) return;
    const id = setTimeout(() => navigate("/leaderboard"), 3000);
    return () => clearTimeout(id);
  }, [isGameDone, navigate]);

  return (
    <div className="container">
      <div className="game-header">
        <h1 className="game-header__title">World Countries</h1>
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
                placeholder="Enter country name and press Enter..."
                isError={isError}
              />
              <p className="tip">Tip: Hover over a country to see its name</p>
            </>
          )}
          <FoundList items={foundCountries} />
        </div>
        <div className="game-map-panel">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            {geoData &&
              pathFn &&
              geoData.features.map((d, i) => {
                const countryName = d.properties.name;
                const isFound = foundCountries.includes(countryName);
                const isMatch =
                  !isFound &&
                  search &&
                  countryName.toLowerCase().includes(search.toLowerCase());

                return (
                  <path
                    key={i}
                    d={pathFn(d)}
                    className={
                      isFound ? "found" : isMatch ? "highlight" : "state"
                    }
                  >
                    <title>{countryName}</title>
                  </path>
                );
              })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CountriesGame;
