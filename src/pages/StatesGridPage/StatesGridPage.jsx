import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { feature } from "topojson-client";
import StateMiniMap from "../../components/StateMiniMap/StateMiniMap";
import { toSlug } from "../../utils/helpers";
import Button from "../../components/ui/Button/Button";
import "./StatesGridPage.css";

function StatesGridPage() {
  const [districtsGeo, setDistrictsGeo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const duration = location.state?.duration ?? null;

  useEffect(() => {
    if (!location.state) { navigate("/", { replace: true }); return; }
  }, [location.state, navigate]);

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
      <Button variant="ghost" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </Button>
      <h1>Pick a State</h1>
      <p className="home-subtitle">
        Click a state to start guessing its districts
      </p>
      {!districtsGeo && <p className="loading">Loading map data…</p>}
      <div className="states-grid">
        {stateGroups.map(([stateName, features]) => (
          <div
            key={stateName}
            className="state-card"
            onClick={() => navigate(`/districts/${toSlug(stateName)}`, { state: { duration } })}
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
