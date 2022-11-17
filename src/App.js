import "./App.css";
import TournamentBrackets from "./pages/TournamentBrackets";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router basename="tournament-bracket">
      <Routes>
        <Route path="/" element={<TournamentBrackets />} />
      </Routes>
    </Router>
  );
}

export default App;
