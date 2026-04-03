import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import StatesGame from "./pages/StatesGame/StatesGame";
import StatesGridPage from "./pages/StatesGridPage/StatesGridPage";
import DistrictGame from "./pages/DistrictGame/DistrictGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/states-game" element={<StatesGame />} />
        <Route path="/districts" element={<StatesGridPage />} />
        <Route path="/districts/:stateName" element={<DistrictGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
