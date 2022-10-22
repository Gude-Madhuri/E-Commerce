import React, { Fragment } from "react";
import { useHistory } from "react-router";

import Button from "../../UI/Button";
import Card from "../../UI/Card";
import CartItem from "./CartItem";

import classes from "./ViewCart.module.css";

import { useSelector, useDispatch } from "react-redux";

const ViewCart = (props) => {
  let history = useHistory();

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const checkOutHandler = () => {
    history.push("/home/check-out");
  };
  return (
    <Fragment>
      <div>
        <div className={classes.backdrop} onClick={props.onConfirm} />
        <Card className={classes.modal}>
          {totalAmount === 0 && (
            <div className={classes["cart-content"]} >
              <h3>Cart is Empty</h3>
            </div>
          )}

          {!(totalAmount === 0) && (
            <div>
              {props.cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  cartId={item.id}
                  productId={item.productId}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
              <div className={classes["div-content"]}>
                <h4>Total Amount: Rs.{totalAmount}</h4>
                <h4>Total quantity: {totalQuantity}</h4>
              </div>
              <br></br>

              <Button onClick={checkOutHandler}>Check out</Button>
              <Button className={classes.actions} onClick={props.onConfirm}>
                Close
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Fragment>
  );
};

export default ViewCart;
