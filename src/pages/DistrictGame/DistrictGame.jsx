import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FaArrowLeft } from "react-icons/fa";
import { toSlug } from "../../utils/helpers";
import SearchInput from "../../components/SearchInput/SearchInput";
import FoundList from "../../components/FoundList/FoundList";
import Button from "../../components/ui/Button/Button";

function DistrictGame() {
  const { stateName: stateSlug } = useParams();
  const navigate = useNavigate();

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
    if (e.key !== "Enter" || !stateGeo || !search.trim()) return;
    const match = stateGeo.features.find(
      (f) =>
        f.properties.district.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundDistricts.includes(match.properties.district)) {
      setFoundDistricts((prev) => [...prev, match.properties.district]);
      setScore((prev) => prev + 1);
      setSearch("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const total = stateGeo ? stateGeo.features.length : "…";

  if (allDistrictsGeo && !stateName) {
    return (
      <div className="container">
        <Button variant="ghost" onClick={() => navigate("/districts")}>
          <FaArrowLeft /> Back
        </Button>
        <h1>State not found</h1>
        <p>No state matches "{stateSlug}". Check the URL.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Button variant="ghost" onClick={() => navigate("/districts")}>
        <FaArrowLeft /> Back to States
      </Button>
      <h1>{stateName || "Loading…"}</h1>
      <p className="score">
        Score: {score} / {total}
      </p>
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

      <div className="game-layout">
        <svg width={700} height={600}>
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
