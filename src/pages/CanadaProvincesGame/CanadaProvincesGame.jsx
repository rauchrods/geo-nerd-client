import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FaArrowLeft } from "react-icons/fa";
import SearchInput from "../../components/SearchInput/SearchInput";
import FoundList from "../../components/FoundList/FoundList";
import Button from "../../components/ui/Button/Button";

const WIDTH = 960;
const HEIGHT = 600;

function CanadaProvincesGame() {
  const [geoData, setGeoData] = useState(null);
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [foundProvinces, setFoundProvinces] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

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
    if (e.key !== "Enter" || !geoData || !search.trim()) return;
    const match = geoData.features.find(
      (f) => f.properties.NAME.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !foundProvinces.includes(match.properties.NAME)) {
      setFoundProvinces((prev) => [...prev, match.properties.NAME]);
      setScore((prev) => prev + 1);
      setSearch("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const total = geoData ? geoData.features.length : 13;

  return (
    <div className="container">
      <Button variant="ghost" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </Button>
      <h1>Canada Provinces & Territories</h1>
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
        placeholder="Enter province or territory name and press Enter..."
        isError={isError}
      />
      <p className="tip">Tip: Hover over a region to see its name</p>

      <div className="game-layout">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width={WIDTH}
          height={HEIGHT}
          style={{ maxWidth: "100%", height: "auto" }}
        >
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
                  className={isFound ? "found" : isMatch ? "highlight" : "state"}
                >
                  <title>{name}</title>
                </path>
              );
            })}
        </svg>

        <FoundList items={foundProvinces} />
      </div>
    </div>
  );
}

export default CanadaProvincesGame;
