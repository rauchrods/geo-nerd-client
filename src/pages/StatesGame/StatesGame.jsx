import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";

function StatesGame() {
  const [geoData, setGeoData] = useState(null);
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [foundStates, setFoundStates] = useState([]);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || !geoData || !search.trim()) return;
    const match = geoData.features.find(
      (f) => f.properties.st_nm.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundStates.includes(match.properties.st_nm)) {
      setFoundStates((prev) => [...prev, match.properties.st_nm]);
      setScore((prev) => prev + 1);
      setSearch("");
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

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      <h1>Indian States</h1>
      <p className="score">Score: {score} / {total}</p>
      <input
        type="text"
        placeholder="Enter state name and press Enter..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <p className="tip">Tip: Hover over a state to see its name</p>

      <svg width={800} height={800}>
        {geoData &&
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
                d={d3
                  .geoPath()
                  .projection(d3.geoMercator().fitSize([800, 800], geoData))(d)}
                className={isFound ? "found" : isMatch ? "highlight" : "state"}
              >
                <title>{stateName}</title>
              </path>
            );
          })}
      </svg>
    </div>
  );
}

export default StatesGame;
