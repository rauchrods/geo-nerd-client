import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import "./UserMenu.css";

function UserMenu() {
  const { user, signIn, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Still loading auth state
  if (user === undefined) return null;

  if (!user) {
    return (
      <button className="user-menu__signin" onClick={signIn} title="Sign in with Google">
        Sign In
      </button>
    );
  }

  return (
    <div className="user-menu" ref={ref}>
      <button className="user-menu__avatar" onClick={() => setOpen((o) => !o)} title={user.displayName}>
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
        ) : (
          <span>{user.displayName?.[0] ?? "?"}</span>
        )}
      </button>

      {open && (
        <div className="user-menu__dropdown">
          <p className="user-menu__name">{user.displayName}</p>
          <p className="user-menu__email">{user.email}</p>
          <button className="user-menu__logout" onClick={() => { logOut(); setOpen(false); }}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
