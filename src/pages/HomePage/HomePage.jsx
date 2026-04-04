import { useNavigate, Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import GameCard from "../../components/ui/GameCard/GameCard";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🗺️ Geo Nerd</h1>
      <p className="home-subtitle">Test your knowledge of geography!</p>
      <div className="home-options">
        <GameCard
          onClick={() => navigate("/states-game")}
          flagSrc="https://flagcdn.com/w80/in.png"
          flagAlt="India flag"
          label="Play Indian States"
          desc="Guess all 36 states & UTs"
        />
        <GameCard
          onClick={() => navigate("/districts")}
          flagSrc="https://flagcdn.com/w80/in.png"
          flagAlt="India flag"
          label="Play State Districts"
          desc="Pick a state, guess its districts"
        />
        <GameCard
          onClick={() => navigate("/countries-game")}
          emoji="🌍"
          label="Play World Countries"
          desc="Guess all 180 countries"
        />
        <GameCard
          onClick={() => navigate("/usa-states-game")}
          flagSrc="https://flagcdn.com/w80/us.png"
          flagAlt="USA flag"
          label="Play US States"
          desc="Guess all 50 states & DC"
        />
        <GameCard
          onClick={() => navigate("/canada-provinces-game")}
          flagSrc="https://flagcdn.com/w80/ca.png"
          flagAlt="Canada flag"
          label="Play Canada Provinces"
          desc="Guess all 13 provinces & territories"
        />
      </div>
      <Link to="/about" className="home-about-link">
        <FaInfoCircle /> About this project
      </Link>
    </div>
  );
}

export default HomePage;
