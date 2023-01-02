import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Product from "./components/Product";
import CategorizedProducts from "./components/CategorizedProducts/CategorizedProducts";
import NotFound from "./components/404";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#29363F",
        backgroundSize: "contain",
        margin: "0",
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/products/category/:category"
          element={<CategorizedProducts />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
