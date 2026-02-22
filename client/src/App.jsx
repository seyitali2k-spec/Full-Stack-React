import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddGame from "./pages/AddGame";
import "./index.css";

export default function App() {
  return (
<>
  <nav className="navbar">
  <div className="logo">🎮 GameTracker</div>

  <div className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/add">Add Game</Link>
  </div>
  </nav>

  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/add" element={<AddGame />} />
  </Routes>
</>
);
}