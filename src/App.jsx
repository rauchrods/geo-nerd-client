import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import HomePage from "./pages/HomePage/HomePage";
import StatesGame from "./pages/StatesGame/StatesGame";
import StatesGridPage from "./pages/StatesGridPage/StatesGridPage";
import DistrictGame from "./pages/DistrictGame/DistrictGame";
import AboutPage from "./pages/AboutPage/AboutPage";
import CountriesGame from "./pages/CountriesGame/CountriesGame";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/states-game" element={<StatesGame />} />
          <Route path="/districts" element={<StatesGridPage />} />
          <Route path="/districts/:stateName" element={<DistrictGame />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/countries-game" element={<CountriesGame />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
