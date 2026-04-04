import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import GameCard from "../../components/ui/GameCard/GameCard";
import TimerSelectModal from "../../components/TimerSelectModal/TimerSelectModal";
import "./HomePage.css";

function HomePage() {
  const [pendingRoute, setPendingRoute] = useState(null);

  const openTimer = (route) => setPendingRoute(route);
  const closeTimer = () => setPendingRoute(null);

  return (
    <div className="home-container">
      <h1 className="home-title">🗺️ Geo Nerd</h1>
      <p className="home-subtitle">Test your knowledge of geography!</p>
      <div className="home-options">
        <GameCard
          onClick={() => openTimer("/states-game")}
          flagSrc="https://flagcdn.com/w80/in.png"
          flagAlt="India flag"
          label="Play Indian States"
          desc="Guess all 36 states & UTs"
        />
        <GameCard
          onClick={() => openTimer("/districts")}
          flagSrc="https://flagcdn.com/w80/in.png"
          flagAlt="India flag"
          label="Play State Districts"
          desc="Pick a state, guess its districts"
        />
        <GameCard
          onClick={() => openTimer("/countries-game")}
          emoji="🌍"
          label="Play World Countries"
          desc="Guess all 180 countries"
        />
        <GameCard
          onClick={() => openTimer("/usa-states-game")}
          flagSrc="https://flagcdn.com/w80/us.png"
          flagAlt="USA flag"
          label="Play US States"
          desc="Guess all 50 states & DC"
        />
        <GameCard
          onClick={() => openTimer("/canada-provinces-game")}
          flagSrc="https://flagcdn.com/w80/ca.png"
          flagAlt="Canada flag"
          label="Play Canada Provinces"
          desc="Guess all 13 provinces & territories"
        />
      </div>
      <Link to="/about" className="home-about-link">
        <FaInfoCircle /> About this project
      </Link>

      {pendingRoute && (
        <TimerSelectModal route={pendingRoute} onClose={closeTimer} />
      )}
    </div>
  );
}

export default HomePage;
