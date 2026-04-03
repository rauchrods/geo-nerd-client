import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { feature } from "topojson-client";
import StateMiniMap from "../../components/StateMiniMap/StateMiniMap";
import { toSlug } from "../../utils/helpers";
import "./StatesGridPage.css";

function StatesGridPage() {
  const [districtsGeo, setDistrictsGeo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/india-states.json")
      .then((res) => res.json())
      .then((data) => {
        const districts = feature(data, data.objects.districts);
        setDistrictsGeo(districts);
      });
  }, []);

  const stateGroups = useMemo(() => {
    if (!districtsGeo) return [];
    const groups = {};
    districtsGeo.features.forEach((f) => {
      const name = f.properties.st_nm;
      if (!groups[name]) groups[name] = [];
      groups[name].push(f);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [districtsGeo]);

  console.log("stateGroups", stateGroups);

  return (
    <div className="grid-page">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      <h1>Pick a State</h1>
      <p className="home-subtitle">Click a state to start guessing its districts</p>
      {!districtsGeo && <p className="loading">Loading map data…</p>}
      <div className="states-grid">
        {stateGroups.map(([stateName, features]) => (
          <div
            key={stateName}
            className="state-card"
            onClick={() => navigate(`/districts/${toSlug(stateName)}`)}
          >
            <StateMiniMap features={features} />
            <p className="state-card-name">{stateName}</p>
            <p className="state-card-count">{features.length} districts</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatesGridPage;
