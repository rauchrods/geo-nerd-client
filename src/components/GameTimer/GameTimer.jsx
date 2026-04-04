import { useEffect } from "react";
import "./GameTimer.css";
import { playBeep } from "../../assets/sounds/sound";

function GameTimer({ formatted, isOver, timeLeft }) {
  const isUrgent =
    !isOver && timeLeft !== null && timeLeft <= 30 && timeLeft > 0;

  useEffect(() => {
    if (isUrgent) playBeep();
  }, [isUrgent, timeLeft]);

  return (
    <div
      className={`game-timer${isOver ? " game-timer--over" : isUrgent ? " game-timer--urgent" : formatted === null ? " game-timer--nolimit" : ""}`}
    >
      {isOver ? "⏰ Time's Up!" : formatted === null ? "∞ No Limit" : `⏱ ${formatted}`}
    </div>
  );
}

export default GameTimer;
