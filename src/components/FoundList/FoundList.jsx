import { useState } from "react";
import "./FoundList.css";

function FoundList({ items, label = "Found" }) {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <div className="found-list-panel">
      <button
        className="found-list-toggle"
        onClick={() => setIsOpen((p) => !p)}
      >
        <span>
          {label} ({items.length})
        </span>
        <span
          className={`found-list-chevron${isOpen ? " found-list-chevron--open" : ""}`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <ul className="found-list">
          {items.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoundList;
