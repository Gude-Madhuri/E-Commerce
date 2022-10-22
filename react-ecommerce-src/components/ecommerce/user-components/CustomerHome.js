import React, { Fragment, useEffect, useState } from "react";

import Products from "./Products";
import Category from "./Category";

import classes from "./CustomerHome.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";

import { authActions, userActions, cartActions } from "../../store/store";

import Header from "./Header";
import HomeFooter from "./HomeFooter";
import Button from "../../UI/Button";

import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useHistory } from "react-router";

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

const CustomerHome = (props) => {
  let history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.user.userId);
  const role = useSelector((state) => state.user.role);

  const [cartfetch, setCartfetch] = useState(false);

  const [id, setId] = useState();

  let dispatch = useDispatch();
  const classesUI = useStyles();

  const requestData = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  async function fetchCartData() {
    const response = await fetch(
      "http://localhost:8080/ecommerce/cartByUserId/" + `${userId}`,
      requestData
    );
    const data = await response.json();

    const cartItemsFetched = data.map((cartData) => {
      return {
        id: cartData.cartId,
        productId: cartData.productId,
        price: cartData.price,
        quantity: cartData.quantity,
      };
    });

    dispatch(cartActions.loadcartitems(cartItemsFetched));
    setCartfetch(true);
  }

  useEffect(() => {
    fetchCartData();
  }, []);

  const backHandler = () => {
    history.replace("/admin-home");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <div>
      {cartfetch && (
        <Fragment>
          {role === "customer" && <Header />}

          {role === "admin" && (
            <div className={classesUI.root}>
              <AppBar position="static" style={{ background: "#0a6c7e" }}>
                <Toolbar>
                  <IconButton>
                    <HomeIcon
                      style={{ color: "white", float: "left" }}
                      onClick={backHandler}
                    />
                  </IconButton>

                  <h6 style={{ color: "white", marginTop: "8px" }}>
                    De-KART
                  </h6>
                  <Typography
                    variant="h6"
                    className={classesUI.title}
                  ></Typography>
                  <IconButton onClick={logoutHandler}>
                    <ExitToAppIcon style={{ color: "white" }} />
                    <h6 style={{ color: "white", marginTop: "8px" }}>LOGOUT</h6>
                  </IconButton>
                </Toolbar>
              </AppBar>
            </div>
          )}

          <div class="row">
            <div class="col-sm-3">
              <Category setId={setId} />
            </div>
            <div class="col-sm-9">
              <Products id={id} />
            </div>
          </div>
        </Fragment>
      )}
      {!isAuth && <p>Login is needed</p>}

      {/* {role === "customer" && (
        <footer>
          <HomeFooter />
        </footer>
      )} */}
    </div>
  );
};

export default CustomerHome;
