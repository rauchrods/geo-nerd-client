import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="about-card">
        <div className="about-globe">🌍</div>
        <h1 className="about-title">About Geo Nerd</h1>

        <p className="about-body">
          I&apos;ve always had an immense interest in geography and world maps —
          the way borders are drawn, how states and districts are shaped, and
          the stories they tell. Geo Nerd is my way of turning that passion into
          something playful and interactive.
        </p>

        <p className="about-body">
          This project started as a way to test my own knowledge of Indian
          geography, and hopefully yours too. Whether you&apos;re a geography
          nerd or just curious, I hope you enjoy it!
        </p>

        <div className="about-divider" />

        <p className="about-made-with">Made with ❤️ by</p>
        <p className="about-name">Rauch Rodrigues</p>

        <div className="about-links">
          <a
            href="https://rauchrodrigues.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            🌐 Portfolio
          </a>
          <a
            href="https://github.com/rauchrods"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            <svg
              className="about-link-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
