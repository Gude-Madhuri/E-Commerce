import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Button from "../../UI/Button";
import { useHistory } from "react-router";

import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/store";
import ChangeRoleTable from "./ChangeRoleTable";

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

const AddAdmin = (props) => {
  let history = useHistory();
  let dispatch = useDispatch();
  const classes = useStyles();
  

  const [usersList, setUsersList] = useState([]);
  const [load, setLoad] = useState(false);

  async function fetchUsers(){
    const response = await fetch(
        "http://localhost:8080/ecommerce/users",
        {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            method: "GET",
          }
    )
    const data = await response.json();
    const userLoggedIn = data.map((userData) => {
      return {
        id: userData.id,
        name: userData.username,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };
    });
    setUsersList(userLoggedIn);
    console.log(usersList);
}

  useEffect( () => {
      fetchUsers();
  }, [load]);
  
  const backHandler = () => {
    history.replace("/admin-home");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const loadHandler = () => {
    setLoad(!load);
    console.log(load);
  };
  
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "#0a6c7e" }}>
          <Toolbar>
            <IconButton>
              <HomeIcon
                style={{ color: "white", float: "left" }}
                onClick={backHandler}
              />
              
            </IconButton>

            <h6 style={{color:"white", marginTop:"8px"}}>MANAGE USERS</h6>
            <Typography variant="h6" className={classes.title}>
            
            </Typography>
            <IconButton onClick={logoutHandler}><ExitToAppIcon style={{color:"white"}}   /><h6 style={{color:"white", marginTop:"8px"}}>LOGOUT</h6></IconButton>
            
          </Toolbar>
        </AppBar>
      </div>
      <ChangeRoleTable rows={usersList} loadHandler={loadHandler} />
    </Fragment>
  );
};

export default AddAdmin;
