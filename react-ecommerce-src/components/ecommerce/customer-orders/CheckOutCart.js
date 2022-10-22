import React, { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import { useSelector } from "react-redux";

import classes from "./CheckOutCart.module.css";
import CheckOutCartItem from "./CheckOutCartItem";

const CheckOutCart = (props) => {
  const cartitemslist = useSelector((state) => state.cart.cartlist);

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Card className={classes.content}>
      {/* <div className={classes["items"]} >
        <h2>Items</h2>
      </div> */}

      {cartitemslist.map((item) => (
        <CheckOutCartItem
          key={item.productId}
          productId={item.productId}
          price={item.price}
          quantity={item.quantity}
        />
        // <li className={classes["cart-item"]}>
        //   <div>
        //     <label>Product Id</label>
        //     <h2>{}</h2>
        //     <div>
        //       <label>Price: </label>
        //       <p>{item.price}</p>

        //       <br></br>
        //       <label>Quantity: </label>
        //       <p>{item.quantity}</p>
        //     </div>
        //   </div>
        // </li>
      ))}

      <div className={classes["div-content"]}>
        <h4>Total Amount: Rs.{totalAmount}</h4>
        <h4>Total quantity: {totalQuantity}</h4>
      </div>
    </Card>
  );
};

export default CheckOutCart;
