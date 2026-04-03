import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🗺️ Geo Nerd</h1>
      <p className="home-subtitle">Test your knowledge of Indian geography!</p>
      <div className="home-options">
        <button className="home-btn" onClick={() => navigate("/states-game")}>
          <span className="home-btn-icon">🏛️</span>
          <span className="home-btn-label">Play Indian States</span>
          <span className="home-btn-desc">Guess all 36 states & UTs</span>
        </button>
        <button className="home-btn" onClick={() => navigate("/districts")}>
          <span className="home-btn-icon">📍</span>
          <span className="home-btn-label">Play State Districts</span>
          <span className="home-btn-desc">Pick a state, guess its districts</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
