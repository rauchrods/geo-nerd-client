import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { toSlug } from "../../utils/helpers";
import SearchInput from "../../components/SearchInput/SearchInput";
import FoundList from "../../components/FoundList/FoundList";
import GameTimer from "../../components/GameTimer/GameTimer";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useScoreSaver } from "../../hooks/useScoreSaver";

function DistrictGame() {
  const { stateName: stateSlug } = useParams();
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

  const [allDistrictsGeo, setAllDistrictsGeo] = useState(null);
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [foundDistricts, setFoundDistricts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("/india-states.json")
      .then((res) => res.json())
      .then((data) => {
        const districts = feature(data, data.objects.districts);
        setAllDistrictsGeo(districts);
      });
  }, []);

  const stateName = useMemo(() => {
    if (!allDistrictsGeo) return null;
    const match = allDistrictsGeo.features.find(
      (f) => toSlug(f.properties.st_nm) === stateSlug,
    );
    return match ? match.properties.st_nm : null;
  }, [allDistrictsGeo, stateSlug]);

  const stateGeo = useMemo(() => {
    if (!allDistrictsGeo || !stateName) return null;
    return {
      type: "FeatureCollection",
      features: allDistrictsGeo.features.filter(
        (f) => f.properties.st_nm === stateName,
      ),
    };
  }, [allDistrictsGeo, stateName]);

  const pathFn = useMemo(() => {
    if (!stateGeo) return null;
    const projection = d3.geoMercator().fitSize([700, 600], stateGeo);
    return d3.geoPath().projection(projection);
  }, [stateGeo]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || !stateGeo || !search.trim() || isOver) return;
    const match = stateGeo.features.find(
      (f) =>
        f.properties.district.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundDistricts.includes(match.properties.district)) {
      setFoundDistricts((prev) => [...prev, match.properties.district]);
      setScore((prev) => prev + 1);
      if (location.state?.mode === "survival") addTime(5);
      setSearch("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const total = stateGeo ? stateGeo.features.length : 0;

  useScoreSaver({
    isOver,
    score,
    total,
    game: "districts",
    duration: location.state?.duration ?? null,
    mode: location.state?.mode ?? "classic",
  });

  const isGameDone = isOver || (stateGeo && score === total);

  useEffect(() => {
    if (!isGameDone) return;
    const id = setTimeout(() => navigate("/leaderboard"), 3000);
    return () => clearTimeout(id);
  }, [isGameDone, navigate]);
  if (allDistrictsGeo && !stateName) {
    return (
      <div className="container">
        <h1>State not found</h1>
        <p>No state matches "{stateSlug}". Check the URL.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="game-header">
        <h1 className="game-header__title">{stateName || "Loading…"}</h1>
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
            placeholder="Enter district name and press Enter..."
            isError={isError}
          />
          <p className="tip">Tip: Hover over a district to see its name</p>
        </>
      )}

      <div className="game-layout">
        <svg
          viewBox="0 0 700 600"
          style={{ width: "100%", maxWidth: 700, height: "auto" }}
        >
          {stateGeo &&
            pathFn &&
            stateGeo.features.map((d, i) => {
              const districtName = d.properties.district;
              const isFound = foundDistricts.includes(districtName);
              const isMatch =
                !isFound &&
                search &&
                districtName.toLowerCase().includes(search.toLowerCase());

              return (
                <path
                  key={i}
                  d={pathFn(d)}
                  className={
                    isFound ? "found" : isMatch ? "highlight" : "state"
                  }
                >
                  <title>{districtName}</title>
                </path>
              );
            })}
        </svg>
        <FoundList items={foundDistricts} />
      </div>
    </div>
  );
}

export default DistrictGame;
