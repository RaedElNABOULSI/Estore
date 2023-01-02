import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../constants/Paths";
import { CircularProgress, Pagination, Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";

const CategorizedProducts = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [categorizedProducts, setCategorizedProducts] = useState([]);

  useEffect(() => {
    let categoryId = params.category;
    loadProducts(categoryId);
  }, []);

  const loadProducts = (categoryId) => {
    axios
      .get(`${BASE_API_URL}/products/category/${categoryId}`)
      .then(function (response) {
        setIsLoading(false);
        setCategorizedProducts(response.data);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  const navigate = useNavigate();
  const selectProduct = (productId, navigation = false) => {
    if (navigation) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#29363F",
        height: "100%",
        width: "100%",
      }}
    >
      <Header />
      <div className="row">
        <img
          style={{ opacity: "0.75" }}
          src="/category-background.png"
          width={"1440px"}
          height="70px"
        ></img>
        <div
          style={{
            color: "white",
            position: "relative",
            transform: "translateY(-190%)",
            textTransform: "uppercase",
            font: "inter",
            fontWeight: "500",
            lineHeight: "29.05px",
            fontSize: "24px",
          }}
          class="centered"
        >
          SHOP NOW IN{" "}
          <span style={{ color: "#8FBC8F" }}>{params.category} </span>CATEGORY
        </div>
      </div>
      <div className="row" style={{ marginTop: "10px", marginLeft: "90px" }}>
        {categorizedProducts.length == 0 ? (
          <CircularProgress />
        ) : (
          categorizedProducts.map((product) => {
            return (
              <div key={product.id} className="col-3 mt-5 mr-2">
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => selectProduct(product.id, true)}
                  width={"228px"}
                  height="330px"
                  src={product.image}
                ></img>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1px",
                    marginLeft: "40px",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      marginTop: "20px",
                      width: "225px",
                    }}
                  >
                    {product.title}
                  </p>
                  <p style={{ color: "white", marginTop: "20px" }}>Rating</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="row">
        <div style={{ marginLeft: "50%", position: "relative", right: "10%" }}>
          <Pagination onChange={loadProducts} count={10} />
        </div>
      </div>
    </div>
  );
};

export default CategorizedProducts;
