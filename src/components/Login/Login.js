import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BASE_API_URL } from "../../constants/Paths";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const headerStyle = {
    /* h1 */
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "32px",
    lineHeight: "39px",
    /* identical to box height */

    textTransform: "uppercase",

    color: "#FFFFFF",

    /* Inside auto layout */

    // flex: "none",
    // order: 1,
    // flexGrow: 0,
  };

  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(`${BASE_API_URL}/auth/login`, {
        username: username,
        password: password,
      })
      .then(function (response) {
        setIsLoading(false);
        setIsError(false);
        setErrorMessage("");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch(function (error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#29363F",
        height: "100%",
        width: "100%",
        position: "fixed",
      }}
    >
      <div className="row" style={{ marginTop: "10%" }}>
        <div>
          {" "}
          <img width={"90.81px"} height="63.68px" src="login-logo.png"></img>
        </div>

        <h1 style={headerStyle} className="mt-2 text-light">
          LOG IN TO OUR ONLINE STORE
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row mt-3">
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              value={username}
              onChange={handleChangeUsername}
              className="mx-auto w-50"
              //   type="email"
              required
            />
          </div>
          <div className="row mt-4">
            <TextField
              onChange={handleChangePassword}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              className="mx-auto w-50"
              required
            />
          </div>
          <div className="row mt-4">
            {isLoading ? (
              <CircularProgress style={{ marginLeft: "45%" }} />
            ) : (
              <Button
                type="submit"
                className="text-center mx-auto"
                style={{
                  width: "50%",
                  color: "white",
                  backgroundColor: "#6ED9A1",
                }}
                variant="contained"
              >
                Login
              </Button>
            )}
          </div>
          {isError && (
            <div className="row mt-3">
              <Alert
                style={{ width: "30%" }}
                className="text-center mx-auto"
                severity="error"
              >
                {errorMessage}
              </Alert>
            </div>
          )}
        </form>
        <p className="mt-3 text-light">
          don't have an account? &nbsp; <a href="">sign up</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
