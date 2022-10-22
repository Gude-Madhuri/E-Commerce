import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import ErrorModal from "../../UI/ErrorModal";

import { useDispatch, useSelector } from "react-redux";
import { authActions, userActions } from "../../store/store";

import classes from "./Login.module.css";
import LoginWithGoogle from "../login-with-google/LoginWithGoogle";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const clientId =
    "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  async function onLoginSuccess(res) {
    console.log(
      "Login Success:",
      res.profileObj["email"],
      res.profileObj["googleId"]
    );

    const requestData = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: res.profileObj["email"],
        pwd: res.profileObj["googleId"],
      }),
    };

    const response = await fetch(
      "http://localhost:8080/ecommerce/login",
      requestData
    );
    const data = await response.json();

    const userLoggedIn = data.map((userData) => {
      return {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        password: userData.pwd,
        address: userData.address,
      };
    });
    console.log(userLoggedIn);
    dispatch(authActions.login(true));
    dispatch(
      userActions.setuserdetails({
        userid: userLoggedIn[0].id,
        role: userLoggedIn[0].role,
        username: userLoggedIn[0].username,
        password: userLoggedIn[0].password,
        address: userLoggedIn[0].address,
      })
    );

    history.push("/home");

    setShowloginButton(false);
    setShowlogoutButton(true);
  }

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
    setError("Something went wrong");
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  async function onLoginHandler(event) {
    event.preventDefault();

    if (
      enteredUsername.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      setError("Username/Password should not be empty");
      return;
    }
    const requestData = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: enteredUsername,
        pwd: enteredPassword,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/ecommerce/login",
        requestData
      );
      const data = await response.json();

      if (data.length === 0) {
        throw new Error();
      } else {
        const userLoggedIn = data.map((userData) => {
          return {
            id: userData.id,
            username: userData.username,
            role: userData.role,
            password: userData.pwd,
            address: userData.address,
          };
        });
        dispatch(authActions.login(false));
        dispatch(
          userActions.setuserdetails({
            userid: userLoggedIn[0].id,
            role: userLoggedIn[0].role,
            username: userLoggedIn[0].username,
            password: userLoggedIn[0].password,
            address: userLoggedIn[0].address,
          })
        );

        // console.log("Login");
        // console.log(userLoggedIn[0]);
        if (userLoggedIn[0].role === "customer") {
          history.push("/home");
        } else {
          history.push("/admin-home");
        }
      }

      setEnteredUsername("");
      setEnteredPassword("");
    } catch (error) {
      setError("Invalid Username/Password");
    }
  }

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const showPasswordHandler = () => {
    const val = showPassword;
    setShowPassword(!val);
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {error && <ErrorModal message={error} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={onLoginHandler}>
          <label>Username*</label>
          <input
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <br></br>

          <label>Password*</label>
          <input
            type={showPassword ? "text" : "password"}
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
          <br></br>

          <div class="row">
            <div class="col-sm-6">
              <Button type="button" onClick={showPasswordHandler}>
                Show Password
              </Button>
            </div>
            <div class="col-sm-4">
              <Button type="submit">Login</Button>
            </div>
          </div>

          <br></br>
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
