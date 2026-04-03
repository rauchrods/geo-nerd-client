import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaGlobe, FaHeart, FaGithub, FaDatabase } from "react-icons/fa";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </button>

      <div className="about-card">
        <FaGlobe className="about-globe" />
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

        <p className="about-made-with">Made with <FaHeart className="about-heart" /> by</p>
        <p className="about-name">Rauch Rodrigues</p>

        <div className="about-links">
          <a
            href="https://rauchrodrigues.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            <FaGlobe /> Portfolio
          </a>
          <a
            href="https://github.com/rauchrods"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            <FaGithub /> GitHub
          </a>
        </div>

        <div className="about-divider" />

        <div className="about-credits">
          <p className="about-credits-title"><FaDatabase className="about-credits-icon" /> Map Data</p>
          <p className="about-credits-body">
            India map TopoJSON data provided by{" "}
            <a
              href="https://github.com/udit-001/india-maps-data"
              target="_blank"
              rel="noopener noreferrer"
              className="about-credits-link"
            >
              udit-001/india-maps-data
            </a>
            . Huge thanks for making this open and accessible!
          </p>
          <p className="about-credits-body" style={{ marginTop: "10px" }}>
            World countries TopoJSON data provided by{" "}
            <a
              href="https://github.com/subyfly/topojson/blob/master/world-countries.json"
              target="_blank"
              rel="noopener noreferrer"
              className="about-credits-link"
            >
              subyfly/topojson
            </a>
            . Thanks for sharing this with the community!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
