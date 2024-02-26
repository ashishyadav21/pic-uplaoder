import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Home from "./container/Home";
import PrivateRoute from "./auth/PrivateRoutes"

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/*" element={<Home />} />
      </Route>
      <Route index path="/login" element={<Login />} />
    </Routes>

  );
}

export default App;

