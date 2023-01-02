import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../constants/Paths";
import { CircularProgress, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../Header";

const Product = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    let productId = params.id;
    loadProduct(productId);
  }, []);

  const loadProduct = (productId) => {
    // setIsLoading(true);
    axios
      .get(`${BASE_API_URL}/products/${productId}`)
      .then(function (response) {
        setIsLoading(false);
        setProduct(response.data);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div style={{ marginRight: "100px" }} className="row mr-5">
          <div className="col-6 mt-5">
            <img width={"228px"} height="330px" src={product.image} />
          </div>
          <div className="col-6 mt-5" style={{ color: "white" }}>
            <h4>{product.title}</h4>
            <h4 style={{ marginRight: "480px" }}>${product.price}</h4>
            <Rating
              style={{ marginRight: "450px" }}
              name="simple-controlled"
              value={product.rating.rate}
            />
            <p style={{ width: "500px", marginLeft: "10%" }}>
              {product.description}
            </p>
            <div style={{ marginRight: "10%" }}>
              {" "}
              <img width={"459px"} height="64px" src={"/size-section.png"} />
            </div>
            <div>
              {" "}
              <img
                style={{ marginRight: "25%" }}
                className="mt-5"
                width={"369px"}
                height="64px"
                src={"/quantity.png"}
              />
            </div>
            <div>
              {" "}
              <img
                style={{ marginRight: "100px", marginBottom: "20px" }}
                className="mt-5"
                width={"459px"}
                height="51px"
                src={"/add-to-cart.png"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
