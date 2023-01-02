import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="*" element={<Navigate to={"/404"} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
