import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { BASE_API_URL } from "../../constants/Paths";
import { Avatar, CircularProgress, Pagination } from "@mui/material";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productsLimit, setProductsLimit] = useState(10);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_API_URL}/products/categories`)
      .then(function (response) {
        setIsLoading(false);
        setCategoryList(response.data);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

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

  return (
    <div
      style={{
        backgroundColor: "#29363F",
        height: "100%",
        width: "100%",
        // position: "fixed",
      }}
    >
      <div className="row">
        <div
          style={{ marginTop: "44px", marginLeft: "20px" }}
          className="col-4"
        >
          {" "}
          <img width={"111.58px"} height="24px" src="home-logo.png"></img>
        </div>
        <div
          style={{
            marginTop: "30px",
            // marginLeft: "476.58px",
            // position: "fixed",
          }}
          className="col-4"
        >
          <img
            width={"488.86px"}
            height="52px"
            src="search-bar.png"
            alt="search-bar"
          ></img>
        </div>
        <div
          style={{
            marginLeft: "1306.45px",
            position: "relative",
            bottom: "35px",
          }}
          className="col-2"
        >
          <img width={"22px"} height="22px" src="User.png"></img>
        </div>
        <div
          style={{
            marginLeft: "1342.45px",
            position: "relative",
            bottom: "60px",
          }}
          className="col-2"
        >
          <img width={"28px"} height="24px" src="cart.png"></img>
        </div>
      </div>
      <div className="row">
        <div
          className="col-3"
          style={{
            marginTop: "40px",
            marginLeft: "100px",
            position: "absolute",
          }}
        >
          <img width={"141px"} height="31px" src="category.png"></img>
        </div>
        <div
          className="col-9"
          style={{
            // position: "fixed",
            marginTop: "40px",
            marginLeft: "40px",
            marginRight: "50px",
          }}
        >
          {categoryList.length == 0 ? (
            <CircularProgress />
          ) : (
            categoryList.map((category) => {
              return (
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    // padding: "15px 32px",
                    textAlign: "center",
                    left: "200px",
                    // position: "absolute",
                  }}
                >
                  <Button
                    // id="basic-button"
                    style={{
                      color: "white",
                    }}
                    // aria-haspopup="true"
                  >
                    {category}
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </div>
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
                <img width={"228px"} height="330px" src={product.image}></img>
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
