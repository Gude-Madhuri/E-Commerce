import React, { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import { useSelector } from "react-redux";

import classes from "./CheckOutCartItem.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

const CheckOutCartItem = (props) => {
  const productlist = useSelector((state) => state.product.productlist);

  const productitem = productlist.find((item) => item.id === props.productId);

  const setUrl = (response) => {
    let binaryString = window.atob(response);
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    const url = URL.createObjectURL(new Blob([bytes]));
    console.log(url);
    return url;
  };
  return (
    <Fragment>
      <li key={props.key} className={classes["cart-item"]}>
        <div class="row">
          <div class="col-sm-9">
            <div>
              <h3>{productitem.title}</h3>
              <p style={{ color: "black" }}>{productitem.description}</p>

              <div className={classes.summary}>
                <span className={classes.price}>{props.price}</span>
                <span className={classes.amount}>x {props.quantity}</span>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <img
              src={setUrl(productitem.image)}
              alt="image"
              width="100px"
              height="100px"
            ></img>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default CheckOutCartItem;
