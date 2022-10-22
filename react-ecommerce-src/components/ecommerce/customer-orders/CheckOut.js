import React, { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";

import { useHistory } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import CheckOutCart from "./CheckOutCart";
import Address from "./Address";

import classes from "./CheckOut.module.css";
import PlaceOrder from "./PlaceOrder";

const CheckOut = (props) => {
  let history = useHistory();

  const backHandler = () => {
    history.replace("/home");
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>Check out</h2>
        <Button onClick={backHandler}>Back</Button>
      </header>

      <br></br>
      <br></br>
      <div class="row" style={{padding:"30px"}}  >
      <div class="col-sm-5">
          <CheckOutCart />
        </div>
        <div class="col-sm-5">
          <PlaceOrder />
        </div>
        
      </div>
    </Fragment>
  );
};

export default CheckOut;
