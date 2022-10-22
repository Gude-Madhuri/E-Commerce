import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Fragment, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Button from "../../UI/Button";

import { useHistory } from "react-router";
import classes from "./AdminHeader.module.css";
import AdminOrderTable from "./AdminOrderTable";

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

const AdminHeader = (props) => {
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
  const userName = useSelector((state) => state.user.username);

  const [ordersList, setOrdersList] = useState([]);
  const [load, setLoad] = useState(false);

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
      "http://localhost:8080/ecommerce/orders",
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

  const viewProductHandler = () => {
    history.replace("/home");
  };

  const addAdminHandler = () =>{
    history.replace("/admin-home/add-admin");
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" style={{background:"#0a6c7e"}} >
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
                    props.categoryHandler();
                  }}
                >
                  Add Category
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    props.productHandler();
                  }}
                >
                  Add Product
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    viewProductHandler();
                  }}
                >
                  View Products
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    addAdminHandler();
                  }}
                >
                  Add Admin
                </MenuItem>
              </Menu>
            </div>

            <Typography variant="h6" className={classes.title}>
              Ecommerce
            </Typography>
            
            <h3 style={{float: "right", paddingRight:"20px"}} >{userName}</h3>
            <ExitToAppIcon onClick={props.logoutHandler} />

          </Toolbar>
        </AppBar>
      </div>
      <br></br>
      <AdminOrderTable rows={ordersList} loadHandler={loadHandler} />
    </Fragment>
  );
};

export default AdminHeader;
