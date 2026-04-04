import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import UserMenu from "./components/UserMenu/UserMenu";
import HomePage from "./pages/HomePage/HomePage";
import IndianStatesGame from "./pages/IndianStatesGame/IndianStatesGame";
import StatesGridPage from "./pages/StatesGridPage/StatesGridPage";
import DistrictGame from "./pages/DistrictGame/DistrictGame";
import AboutPage from "./pages/AboutPage/AboutPage";
import CountriesGame from "./pages/CountriesGame/CountriesGame";
import UsaStatesGame from "./pages/UsaStatesGame/UsaStatesGame";
import CanadaProvincesGame from "./pages/CanadaProvincesGame/CanadaProvincesGame";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <UserMenu />
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/states-game" element={<IndianStatesGame />} />
            <Route path="/districts" element={<StatesGridPage />} />
            <Route path="/districts/:stateName" element={<DistrictGame />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/countries-game" element={<CountriesGame />} />
            <Route path="/usa-states-game" element={<UsaStatesGame />} />
            <Route path="/canada-provinces-game" element={<CanadaProvincesGame />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
