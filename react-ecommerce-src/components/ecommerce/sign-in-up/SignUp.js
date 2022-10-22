import React, { useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import ErrorModal from "../../UI/ErrorModal";

import classes from "./SignUp.module.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const SignUp = (props) => {
  const [enteredUsername, serEnteredUsername] = useState("");
  const [enteredPassword, serEnteredPassword] = useState("");
  const [enteredPhone, serEnteredPhone] = useState("");
  const [enteredFirstName, serEnteredFirstName] = useState("");
  const [enteredLastName, serEnteredLastName] = useState("");
  const [enteredGender, serEnteredGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  const clientId =
    "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";

  async function onLoginSuccess (res) {
    console.log(
      "Sign up Success:",
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
        role: "customer",
        phone: "",
        firstName: "",
        lastName: "",
        gender: "",
      }),
    };

    const response = await fetch(
      "http://localhost:8080/ecommerce/users",
      requestData
    );
    const data = await response.json();

    if (!response.ok) {
      setError("Username Already exists");
    } else {
      console.log("fdfd");
      console.log(data);
      props.setIslogin(true);
      
    }

  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
    setError("Something went wrong");
  };

  async function onSignUpHandler(event) {
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
        role: "customer",
        phone: enteredPhone,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        gender: enteredGender,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/ecommerce/users",
        requestData
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      } else {
        props.setIslogin(true);
        console.log(data);
      }
    } catch (error) {
      setError("Username Already exists");
    }

    serEnteredUsername("");
    serEnteredPassword("");
    serEnteredPhone("");
    serEnteredFirstName("");
    serEnteredLastName("");
    serEnteredGender("");
  }

  const usernameChangeHandler = (event) => {
    serEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    serEnteredPassword(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    serEnteredPhone(event.target.value);
  };

  const firstNameChangeHandler = (event) => {
    serEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    serEnteredLastName(event.target.value);
  };

  const genderChangeHandler = (event) => {
    serEnteredGender(event.target.value);
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
      {error && <ErrorModal message={error} onConfirm={errorHandler} />}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Card className={classes.input}>
        <form onSubmit={onSignUpHandler}>
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign up with Google"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
          <br></br>
          <hr></hr>
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

          <Button type="button" onClick={showPasswordHandler}>
            Show Password
          </Button>
          <br></br>
          <br></br>

          <label>Phone</label>
          <input
            type="text"
            value={enteredPhone}
            onChange={phoneChangeHandler}
          />
          <br></br>

          <label>First Name</label>
          <input
            type="text"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
          />
          <br></br>

          <label>Last Name</label>
          <input
            type="text"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
          />
          <br></br>

          <label>Gender</label>
          <select value={enteredGender} onChange={genderChangeHandler}>
            <option value="">None</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="n">Prefer not to say</option>
          </select>
          <br></br>
          <br></br>

          {/* <>{Category.map(each => <div><options value={each.id}>{each.title}</options></div>)}
      
      </> */}
          <Button type="submit">SignUp</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
