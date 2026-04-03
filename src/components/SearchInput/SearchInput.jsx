import "./SearchInput.css";

function SearchInput({ value, onChange, onKeyDown, placeholder, ...props }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
}

export default SearchInput;
