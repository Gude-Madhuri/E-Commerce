import React, { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";

import { useHistory } from "react-router";
// import classes from "./ViewOrder.module.css";

import OrderTable from "./ViewOrderTable";

import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/store";

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

const ViewOrder = () => {

  let dispatch = useDispatch();
  const classes = useStyles();
  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.username);

  const [ordersList, setOrdersList] = useState([]);
  const [load, setLoad] = useState(false);

  let history = useHistory();
  const backHandler = () => {
    history.replace("/home");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  async function getOrders() {
    const requestData = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "GET",
    };

    const response = await fetch(
      "http://localhost:8080/ecommerce/ordersByUserId/" + `${userId}`,
      requestData
    );
    if (response.ok) {
      const data = await response.json();
      setOrdersList(data);
    }
  }

  useEffect(() => {
    getOrders();
  }, [load]);

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

            <h6 style={{color:"white", marginTop:"8px"}}>MY ORDERS</h6>
            <Typography variant="h6" className={classes.title}>
            
            </Typography>
            <IconButton onClick={logoutHandler}><ExitToAppIcon style={{color:"white"}}   /><h6 style={{color:"white", marginTop:"8px"}}>LOGOUT</h6></IconButton>
            
          </Toolbar>
        </AppBar>
      </div>
      {/* <header className={classes.header}>
        
      </header> */}

      <OrderTable rows={ordersList} loadHandler={loadHandler} />
    </Fragment>
  );
};

export default ViewOrder;
