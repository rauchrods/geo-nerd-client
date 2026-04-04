import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBars, FaTimes, FaTrophy, FaInfoCircle } from "react-icons/fa";
import { useTheme } from "../../context/useTheme";
import { useAuth } from "../../context/useAuth";
import "./Navbar.css";

function UserAvatar({ user, logOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="nav-avatar-wrap" ref={ref}>
      <button className="nav-avatar" onClick={() => setOpen((o) => !o)} title={user.displayName}>
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
        ) : (
          <span>{user.displayName?.[0] ?? "?"}</span>
        )}
      </button>
      {open && (
        <div className="nav-dropdown">
          <p className="nav-dropdown__name">{user.displayName}</p>
          <p className="nav-dropdown__email">{user.email}</p>
          <button className="nav-dropdown__logout" onClick={() => { logOut(); setOpen(false); }}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, signIn, logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isHome = location.pathname === "/";
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Left */}
        <div className="navbar__left">
          {isHome ? (
            <span className="navbar__logo">🗺️ Geo Nerd</span>
          ) : (
            <button className="navbar__back" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back
            </button>
          )}
        </div>

        {/* Right — desktop */}
        <div className="navbar__right">
          <Link to="/leaderboard" className="navbar__link">
            <FaTrophy /> Leaderboard
          </Link>
          <Link to="/about" className="navbar__link">
            <FaInfoCircle /> About
          </Link>
          <button className="navbar__theme-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user !== undefined && (
            !user ? (
              <button className="navbar__signin" onClick={signIn}>Sign In</button>
            ) : (
              <UserAvatar user={user} logOut={logOut} />
            )
          )}
        </div>

        {/* Hamburger — mobile */}
        <button className="navbar__hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <FaBars />
        </button>
      </nav>

      {/* Sidebar overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " sidebar-overlay--open" : ""}`}
        onClick={closeSidebar}
      >
        <aside
          className={`sidebar${sidebarOpen ? " sidebar--open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="sidebar__close" onClick={closeSidebar} aria-label="Close menu">
            <FaTimes />
          </button>

          <Link to="/" className="sidebar__link" onClick={closeSidebar}>🗺️ Home</Link>
          <Link to="/leaderboard" className="sidebar__link" onClick={closeSidebar}>
            <FaTrophy /> Leaderboard
          </Link>
          <Link to="/about" className="sidebar__link" onClick={closeSidebar}>
            <FaInfoCircle /> About
          </Link>

          <div className="sidebar__divider" />

          <button className="sidebar__theme-btn" onClick={() => { toggleTheme(); closeSidebar(); }}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          {user !== undefined && (
            !user ? (
              <button className="navbar__signin sidebar__signin" onClick={() => { signIn(); closeSidebar(); }}>
                Sign In with Google
              </button>
            ) : (
              <div className="sidebar__user">
                {user.photoURL && (
                  <img src={user.photoURL} alt="" className="sidebar__avatar" referrerPolicy="no-referrer" />
                )}
                <div className="sidebar__user-info">
                  <p className="sidebar__name">{user.displayName}</p>
                  <p className="sidebar__email">{user.email}</p>
                </div>
                <button className="sidebar__logout" onClick={() => { logOut(); closeSidebar(); }}>
                  Sign Out
                </button>
              </div>
            )
          )}
        </aside>
      </div>
    </>
  );
}

export default Navbar;
