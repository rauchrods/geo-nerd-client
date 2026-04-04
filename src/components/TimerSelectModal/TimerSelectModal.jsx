import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TimerSelectModal.css";

const TIMER_OPTIONS = [
  { label: "1 Min", desc: "Quick round", seconds: 60 },
  { label: "2 Min", desc: "Standard game", seconds: 120 },
  { label: "5 Min", desc: "Relaxed pace", seconds: 300 },
  { label: "10 Min", desc: "Take your time", seconds: 600 },
  { label: "No Limit", desc: "Play at your own pace", seconds: null },
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

  const handleSelect = (seconds) => {
    navigate(route, { state: { duration: seconds } });
  };

  return (
    <div className="timer-modal-backdrop" onClick={onClose}>
      <div className="timer-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="timer-modal-title">Choose Your Timer</h2>
        <p className="timer-modal-subtitle">How long do you want to play?</p>
        <div className="timer-modal-options">
          {TIMER_OPTIONS.map(({ label, desc, seconds }) => (
            <button
              key={label}
              className="timer-option-btn"
              onClick={() => handleSelect(seconds)}
            >
              <span className="timer-option-label">{label}</span>
              <span className="timer-option-desc">{desc}</span>
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
