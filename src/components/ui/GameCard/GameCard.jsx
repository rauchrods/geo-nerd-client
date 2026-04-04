import "./GameCard.css";

function GameCard({ onClick, flagSrc, flagAlt, emoji, label, desc }) {
  return (
    <button className="game-card" onClick={onClick}>
      {flagSrc ? (
        <img className="game-card__icon" src={flagSrc} alt={flagAlt} />
      ) : (
        <span className="game-card__icon">{emoji}</span>
      )}
      <div className="game-card__text">
        <span className="game-card__label">{label}</span>
        <span className="game-card__desc">{desc}</span>
      </div>
    </button>
  );
}

export default GameCard;
