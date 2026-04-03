import "./SearchInput.css";

function SearchInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  isError,
  ...props
}) {
  return (
    <input
      className={`search-input${isError ? " search-input--error" : ""}`}
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
