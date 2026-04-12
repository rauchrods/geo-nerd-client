import Button from "../ui/Button/Button";
import "./HintModal.css";

function HintModal({ onConfirm, onCancel }) {
  return (
    <div className="hint-overlay" onClick={onCancel}>
      <div className="hint-modal" onClick={(e) => e.stopPropagation()}>
        <p className="hint-modal__title">Use a Hint?</p>
        <p className="hint-modal__warning">This will cost −1 point.</p>
        <div className="hint-modal__actions">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="solid" onClick={onConfirm}>
            Use Hint
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HintModal;
