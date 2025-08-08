import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Admin from "./Admin";

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ccc" }}>
        <Link to="/">Signup</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
