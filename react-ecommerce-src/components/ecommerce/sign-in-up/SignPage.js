import { useState } from "react";
import Button from "../../UI/Button";
import Login from "./Login";
import SignUp from "./SignUp";

import { useHistory } from "react-router";

import classes from "./SignPage.module.css";

const SignPage = () => {

  let history = useHistory();

  const [isLogin, setIslogin] = useState(true);

  const loginHandler = () => {
    setIslogin(true);
  };

  const signUpHandler = () => {
    setIslogin(false);
  };

  const googleHandler = () =>{
    history.replace("/login-with-google");
  };
  return (
    <div>
      <header className={classes.header}>
        <h1>Ecommerce</h1>
        
        {isLogin && (
          <Button type="button" onClick={signUpHandler}>
            Create an Account
          </Button>
        )}
        {!isLogin && (
          <Button type="button" onClick={loginHandler}>
            Existing User
          </Button>
        )}
      </header>

      <div>
        
        <br></br>

        <br></br>
        {isLogin && <Login />}
        {!isLogin && <SignUp setIslogin={setIslogin} />}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default SignPage;
