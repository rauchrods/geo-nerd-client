import { useMemo } from "react";
import * as d3 from "d3";
import "./StateMiniMap.css";

function StateMiniMap({ features }) {
  const fc = useMemo(
    () => ({ type: "FeatureCollection", features }),
    [features],
  );
  const pathFn = useMemo(() => {
    const projection = d3.geoMercator().fitSize([110, 110], fc);
    return d3.geoPath().projection(projection);
  }, [fc]);

  return (
    <svg width={110} height={110} className="mini-map">
      {features.map((f, i) => (
        <path key={i} d={pathFn(f)} className="mini-district" />
      ))}
    </svg>
  );
}

export default StateMiniMap;
