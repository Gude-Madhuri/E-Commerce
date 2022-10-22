import React, { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import { useSelector, useDispatch } from "react-redux";

import classes from "./PlaceOrder.module.css";

import { useHistory } from "react-router";

import { cartActions } from "../../store/store";
import Address from "./Address";

const PlaceOrder = (props) => {

  let history = useHistory();
  const dispatch = useDispatch();

  const userid = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.username);
  const userAddress = useSelector((state) => state.user.address);
  const cartItemsFromCart = useSelector((state) => state.cart.cartlist);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [showAddressForm, setShowAddressForm] = useState(false);

  // const [address, setAddress] = useState(null);

  // useEffect( () => {
  //   setAddress(userAddress);
  // });
  
  // async function getAddress() {
  //   const response = await fetch(
  //     "http://localhost:8080/ecommerce/users/" + `${userid}`,
  //     {
  //       mode: "cors",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //       method: "GET",
  //     }
  //   );
  //   const data = await response.json();

  //   setAddress(data["address"]);
  // }

  // useEffect(() => {
  //   getAddress();
  // }, []);

  

  async function deleteCart(){
    const deleteCartResponse = await fetch(
      "http://localhost:8080/ecommerce/deleteCartItemsByUserId/" + `${userid}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
  };

  async function ordersInsert() {
    let currentDate = new Date();
    let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const orderResponse = await fetch(
      "http://localhost:8080/ecommerce/orders",
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userid,
          amount: totalAmount,
          orderDate: currentDate,
          status: "placed",
        }),
        method: "POST",
      }
    );
    
    if (orderResponse.ok) {
      
      const orderData = await orderResponse.json();

      console.log("console");
      console.log(orderData["userId"]);

      const orderId = orderData["orderId"];

      cartItemsFromCart.map(async (item) => {
        let orderLineResponse = await fetch(
          "http://localhost:8080/ecommerce/order-lines",
          {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: orderId,
              productId: item.productId,
              quantity: item.quantity
            }),
            method: "POST",
          }
        );
      });
      
    }
  }

  const placeOrderHandler = () =>{
    ordersInsert();
    deleteCart();

    dispatch(cartActions.emptyCartList());
    history.replace("/home/view-orders");
  };

  const changeAddressHandler = () =>{
    setShowAddressForm(true);
  };

  const closeAddressFormHandler = () =>{
    setShowAddressForm(false);
  };
  return (
    <Card className={classes.content}>
      <h4>{userName}</h4>
      <h5>Address: </h5>
      <p>{userAddress}</p>
      <Button disabled={!userAddress} onClick={placeOrderHandler}>Place Order</Button>
      <Button onClick={changeAddressHandler}>{!userAddress ? "Add Address" : "Change Address" } </Button>
      { showAddressForm && <Address saveAddress={closeAddressFormHandler} />}
    </Card>
  );
};

export default PlaceOrder;
