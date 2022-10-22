import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";

import classes from "./ProductList.module.css";

import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../../store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

const ProductList = (props) => {

  const dispatch = useDispatch();

  let history = useHistory();
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);

  const userIdFromLogin = useSelector((state) => state.user.userId);

  const cartitemslist = useSelector((state) => state.cart.cartlist);

  const role = useSelector((state) => state.user.role);

  const sendData = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId: userIdFromLogin,
      productId: props.id,
      price: props.price,
      quantity: 1,
    }),
  };

  async function addToCartHandler() {
    const response = await fetch(
      "http://localhost:8080/ecommerce/cart",
      sendData
    );
    const data = await response.json();
    if (!response.ok) {
      console.log("Something went wrong");
    } else {
      dispatch(
        cartActions.additemtocart({
          id: data.cartId,
          userId: userIdFromLogin,
          productId: props.id,
          quantity: 1,
          price: props.price,
        })
      );

      setIsProductAddedToCart(true);
      console.log(data);
    }
  }

  useEffect(() => {
    const existingItem = cartitemslist.find(
      (item) => item.productId === props.id
    );
    if (existingItem) {
      setIsProductAddedToCart(true);
    }
  }, [props.id]);

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

  const editProductHandler =() =>{
    history.push();
  }
  return (
    <div className={classes.div}>
      <div className={classes["grid-container"]}>
        <div className={classes["grid-item"]}>
          <img
            src={setUrl(props.image)}
            alt="image"
            width="250px"
            height="250px"
          ></img>
        </div>
        <div className={classes["grid-item"]}>
          <h2>{props.name}</h2>
          <p>Price: Rs.{props.price} </p>
          <p>Description: {props.description}</p>
          {role === "customer" && (
            <Button
              key={props.key}
              disabled={isProductAddedToCart}
              onClick={addToCartHandler}
            >
              {isProductAddedToCart ? "Added to cart" : "Add to cart"}{" "}
            </Button>
          )}
          {/* {role === "admin" && <Button onClick={editProductHandler} >Edit Product</Button>} */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
