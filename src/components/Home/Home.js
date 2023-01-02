import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../constants/Paths";
import { CircularProgress, Pagination, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Home = () => {
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

  const navigate = useNavigate();
  const selectProduct = (productId, navigation = false) => {
    if (navigation) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div
      style={{
        // backgroundColor: "#29363F",
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
              <div key={product.id} className="col-3 mt-5 mr-2">
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => selectProduct(product.id, true)}
                  width={"228px"}
                  height="330px"
                  src={product.image}
                ></img>
                <div className="d-flex flex-column">
                  <div style={{ marginRight: "300px" }}>
                    <p
                      className="p-2"
                      style={{
                        color: "white",
                        position: "relative",
                        left: "80px",
                      }}
                    >
                      {product.title}
                    </p>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      bottom: "100px",
                      left: "80px",
                    }}
                    className="p-2"
                  >
                    <p
                      style={{
                        color: "white",
                      }}
                    >
                      ${product.price}
                    </p>
                    <Rating
                      style={{ marginRight: "50px", marginTop: "20px" }}
                      name="simple-controlled"
                      value={product.rating.rate}
                    />
                  </div>
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
