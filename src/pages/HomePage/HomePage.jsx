import { useNavigate, Link } from "react-router-dom";
import {
  FaMap,
  FaLandmark,
  FaMapMarkerAlt,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🗺️ Geo Nerd</h1>
      <p className="home-subtitle">Test your knowledge of geography!</p>
      <div className="home-options">
        <button className="home-btn" onClick={() => navigate("/states-game")}>
          <FaLandmark className="home-btn-icon" />
          <span className="home-btn-label">Play Indian States</span>
          <span className="home-btn-desc">Guess all 36 states & UTs</span>
        </button>
        <button className="home-btn" onClick={() => navigate("/districts")}>
          <FaMapMarkerAlt className="home-btn-icon" />
          <span className="home-btn-label">Play State Districts</span>
          <span className="home-btn-desc">
            Pick a state, guess its districts
          </span>
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/countries-game")}
        >
          <FaGlobe className="home-btn-icon" />
          <span className="home-btn-label">Play World Countries</span>
          <span className="home-btn-desc">Guess all 180 countries</span>
        </button>
      </div>
      <Link to="/about" className="home-about-link">
        <FaInfoCircle /> About this project
      </Link>
    </div>
  );
}

export default HomePage;
