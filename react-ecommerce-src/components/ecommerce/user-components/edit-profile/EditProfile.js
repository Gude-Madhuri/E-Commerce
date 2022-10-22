import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router";
import Button from "../../../UI/Button";

import Card from "../../../UI/Card";


import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/store";

import classes from "./EditProfile.module.css";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const EditProfile = (props) => {
  let history = useHistory();

  let dispatch = useDispatch();
  const classesUI = useStyles();

  const userId = useSelector((state) => state.user.userId);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fetchState, setFetchState] = useState(false);
  const [msg, setMsg] = useState(false);

  async function getUserDetails() {
    const requestData = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "GET",
    };

    const response = await fetch(
      "http://localhost:8080/ecommerce/users/" + `${userId}`,
      requestData
    );
    if (response.ok) {
      const data = await response.json();
      setUsername(data["username"]);
      setPassword(data["pwd"]);
      setFirstName(data["firstName"]);
      setLastName(data["lastName"]);
      setPhone(data["phone"]);
      setAddress(data["address"]);

      console.log(data["username"]);
    } else {
      console.log("failed to fetch");
    }
  }
  console.log(username);
  console.log(password);
  console.log(firstName);
  useEffect(() => {
    getUserDetails();
    setFetchState(true);
  }, []);



  async function submitHandler(event) {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:8080/ecommerce/updateProfile?userId="+`${userId}`+
      "&username="+`${username}`+
      "&password="+`${password}`+
      "&firstName="+`${firstName}`+
      "&lastName="+`${lastName}`+
      "&phone="+`${phone}`+
      "&address="+`${address}` ,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        method: "PUT",
      }
    );

    setMsg(true);
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    
    // history.replace("/home");
  }

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  const backHandler = () => {
    history.replace("/home");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  console.log(address);
  return (
    <Fragment>
      <div className={classesUI.root}>
        <AppBar position="static" style={{ background: "#0a6c7e" }}>
          <Toolbar>
            <IconButton>
              <HomeIcon
                style={{ color: "white", float: "left" }}
                onClick={backHandler}
              />
              
            </IconButton>

            <h6 style={{color:"white", marginTop:"8px"}}>EDIT PROFILE</h6>
            <Typography variant="h6" className={classesUI.title}>
            
            </Typography>
            <IconButton onClick={logoutHandler}><ExitToAppIcon style={{color:"white"}}   /><h6 style={{color:"white", marginTop:"8px"}}>LOGOUT</h6></IconButton>
            
          </Toolbar>
        </AppBar>
      </div>
      <Card className={classes.input}>
        {msg && <p style={{color:"green"}} >Profile Edited Successfully</p>}
        <form onSubmit={submitHandler}>
          <label>Username*</label>
          <input
            type="text"
            value={username}
            onChange={usernameChangeHandler}
          />
          <br></br>
          <label>Password*</label>
          <input
            type="text"
            value={password}
            onChange={passwordChangeHandler}
          />
          <br></br>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={firstNameChangeHandler}
          />
          <br></br>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={lastNameChangeHandler}
          />
          <br></br>
          <label>Phone</label>
          <input type="text" value={phone} onChange={phoneChangeHandler} />
          <br></br>
          <label>Address</label>
          <input type="text" value={address} onChange={addressChangeHandler} />
          <br></br>
          <Button type="submit" >Save</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default EditProfile;
