import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TimerSelectModal.css";

const CLASSIC_OPTIONS = [
  { label: "1 Min", seconds: 60 },
  { label: "2 Min", seconds: 120 },
  { label: "5 Min", seconds: 300 },
  { label: "10 Min", seconds: 600 },
];

function TimerSelectModal({ route, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSelect = (seconds, mode) => {
    navigate(route, { state: { duration: seconds, mode } });
  };

  return (
    <div className="timer-modal-backdrop" onClick={onClose}>
      <div className="timer-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="timer-modal-title">Choose a Mode</h2>

        {/* Survival mode */}
        <button
          className="timer-option-btn timer-option-btn--survival"
          onClick={() => handleSelect(30, "survival")}
        >
          <span className="timer-option-label">⚡ Survival</span>
          <span className="timer-option-desc">30s start — each correct answer adds +5s</span>
        </button>

        {/* Classic timer options */}
        <p className="timer-modal-subtitle">Or pick a fixed timer</p>
        <div className="timer-modal-options">
          {CLASSIC_OPTIONS.map(({ label, seconds }) => (
            <button
              key={label}
              className="timer-option-btn"
              onClick={() => handleSelect(seconds, "classic")}
            >
              <span className="timer-option-label">{label}</span>
              <span className="timer-option-desc">Classic</span>
            </button>
          ))}
        </div>

        <button className="timer-modal-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TimerSelectModal;
