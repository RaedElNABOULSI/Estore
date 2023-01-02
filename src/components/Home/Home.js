import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { BASE_API_URL } from "../../constants/Paths";
import { Avatar, CircularProgress, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Home = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productsLimit, setProductsLimit] = useState(10);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = (limit = productsLimit) => {
    setIsLoading(true);
    setProductsLimit(limit);
    axios
      .get(`${BASE_API_URL}/products?limit=${limit}`)
      .then(function (response) {
        setIsLoading(false);
        setProductList(response.data);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  const selectProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#29363F",
        height: "100%",
        width: "100%",
        // position: "fixed",
      }}
    >
      <Header />
      <div className="row" style={{ marginTop: "10px", marginLeft: "90px" }}>
        {productList.length == 0 ? (
          <CircularProgress />
        ) : (
          productList.map((product) => {
            return (
              <div className="col-3 mt-5 mr-2">
                {/* <Avatar
                  width={"228px"}
                  height="330px"
                  alt="Remy Sharp"
                  src={product.image}
                /> */}
                <img
                  onClick={() => selectProduct(product.id)}
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

export default Home;
