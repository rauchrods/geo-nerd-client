import "./Button.css";

function Button({ children, variant = "ghost", className = "", ...props }) {
  return (
    <button
      className={`ui-btn ui-btn--${variant}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
