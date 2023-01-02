import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Product from "./components/Product";
import CategorizedProducts from "./components/CategorizedProducts/CategorizedProducts";

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
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/products/category/:category"
          element={<CategorizedProducts />}
        />
        {/* <Route path="*" element={<Navigate to={"/404"} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
