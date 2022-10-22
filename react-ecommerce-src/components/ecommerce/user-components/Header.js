import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

import { Fragment, useState } from "react";
import Button from "../../UI/Button";

import ViewCart from "./ViewCart";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { authActions, userActions, cartActions } from "../../store/store";

import classes from "./Header.module.css";

import { GoogleLogin, GoogleLogout } from "react-google-login";

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

const Header = (props) => {
  const clientId =
    "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let history = useHistory();

  const isGoogleLoginAuth = useSelector((state) => state.auth.isGoogleLogin);

  const dispatch = useDispatch();
  const [viewCartVisible, setViewCartVisible] = useState(false);
  const cartItemsFromCart = useSelector((state) => state.cart.cartlist);
  const userName = useSelector((state) => state.user.username);

  async function viewCartHandler() {
    setViewCartVisible(true);
  }

  const closeCartHandler = () => {
    setViewCartVisible(false);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout(false));
  };

  const viewOrdersHandler = () => {
    history.replace("/home/view-orders");
  };

  const editProfileHandler = () => {
    history.replace("/home/edit-profile");
  };

  const onSignoutSuccess = () => {
    dispatch(authActions.logout(false));
    alert("You have been logged out successfully");
    console.clear();
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "#0a6c7e" }}>
          <Toolbar>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    viewOrdersHandler();
                  }}
                >
                  View orders
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleClose();
                    editProfileHandler();
                  }}
                >
                  Edit Profile
                </MenuItem>
              </Menu>
            </div>
            <Typography variant="h6" className={classes.title}>
              Ecommerce
            </Typography>

            <h5
              style={{
                float: "right",
                paddingRight: "30px",
                paddingRight: "30px",
              }}
            >
              {userName}
            </h5>
            <IconButton>
              <ShoppingCartIcon
                style={{ color: "white" }}
                onClick={viewCartHandler}
              />
              <h6 style={{ color: "white", marginTop: "8px" }}>CART</h6>
            </IconButton>

            {isGoogleLoginAuth ? (
              <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
              />
            ) : (
              <IconButton>
                <ExitToAppIcon
                  style={{ color: "white" }}
                  onClick={logoutHandler}
                />
                <h6 style={{ color: "white", marginTop: "8px" }}>LOGOUT</h6>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>

      {viewCartVisible && (
        <ViewCart cartItems={cartItemsFromCart} onConfirm={closeCartHandler} />
      )}
    </Fragment>
  );
};

export default Header;
