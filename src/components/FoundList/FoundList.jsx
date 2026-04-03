import "./FoundList.css";

function FoundList({ items, label = "Found" }) {
  if (items.length === 0) return null;

  return (
    <div className="found-list-panel">
      <h3>
        {label} ({items.length})
      </h3>
      <ul className="found-list">
        {items.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FoundList;
