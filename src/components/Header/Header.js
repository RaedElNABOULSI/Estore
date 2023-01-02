import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_API_URL } from "../../constants/Paths";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const selectCategory = (category) => {
    navigate(`/products/category/${category}`);
  };

  const loadCategories = () => {
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

  return (
    <div
      style={{
        // backgroundColor: "#29363F",
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
          <img
            style={{ cursor: "pointer" }}
            width={"111.58px"}
            height="24px"
            src="/home-logo.png"
            onClick={() => navigate(`/home`)}
          ></img>
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
            src="/search-bar.png"
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
          <img width={"22px"} height="22px" src="/User.png"></img>
        </div>
        <div
          style={{
            marginLeft: "1342.45px",
            position: "relative",
            bottom: "60px",
          }}
          className="col-2"
        >
          <img width={"28px"} height="24px" src="/cart.png"></img>
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
          <img width={"141px"} height="31px" src="/category.png"></img>
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
                  key={category.id}
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
                    key={category.id}
                    // id="basic-button"
                    style={{
                      color: "white",
                    }}
                    onClick={() => selectCategory(category)}
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
    </div>
  );
};

export default Header;
