import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./components/Login";
import Home from "./container/Home";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>

  );
}

export default App;
