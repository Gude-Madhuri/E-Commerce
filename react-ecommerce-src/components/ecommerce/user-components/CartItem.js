import { Fragment } from "react";
import Button from "../../UI/Button";
import classes from "./CartItem.module.css";

import { useSelector, useDispatch } from 'react-redux';

import { cartActions } from "../../store/store";

const CartItem = (props) => {

  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.user.userId) ;
  const cartitemslist = useSelector( (state) => state.cart.cartlist ) ;
  const productlist = useSelector( (state) => state.product.productlist );

  const productitem = productlist.find( item => item.id===props.productId );
  
  const fetchData = async (value) => {
        
    const response = await fetch('http://localhost:8080/ecommerce/cart', {
        method : 'PUT',
        mode: "cors",
        headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"   
        },
        body : JSON.stringify({
            cartId : props.cartId,
            userId : userId,
            productId : props.productId,
            quantity : props.quantity+value,
            price : props.price
        })
    }) ;
    const data = await response.json();

    if( response.ok ) {
        if( value === 1) {
            dispatch(cartActions.additemtocart({
                userId : userId,
                productId : props.productId,
                quantity : props.quantity,
                price : props.price
              }));
        }
        else {
            dispatch(cartActions.removeitemfromcart({
                productId : props.productId,
                status : 1
            }));
        }
    }
    else {
    }
}

const deletedata = async () => {
    const response = await fetch('http://localhost:8080/ecommerce/cart/'+`${props.cartId}`, {
        method : 'DELETE',
        mode: "cors",
        headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"   
        }
    }) ;
    // const data = await response;
}

const increaseHandler = () => {
    fetchData(1);
}

const decreaseHandler = () => {
  if( props.quantity === 1 ) {
      deletedata();
      dispatch(cartActions.removeitemfromcart({
          productId : props.productId,
          status : 1
      }));
  }
  else {
      fetchData(-1);
  }
}

const removeitemHandler = () => {
  deletedata() ;
  dispatch(cartActions.removeitemfromcart({
      productId : props.productId,
      status : 0
  }));
}

  return (
    <Fragment>
      <li className={classes["cart-item"]}>
        <div>
          {/* <h2>{props.productId}</h2> */}
          <h3>{productitem.title}</h3>
          <p style={{color:"black"}} >{productitem.description}</p>
          <div className={classes.summary}>
            <span className={classes.price}>{props.price}</span>
            <span className={classes.amount}>x {props.quantity}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <Button onClick={decreaseHandler}>-</Button>
          <Button onClick={increaseHandler}>+</Button>
          <Button onClick={removeitemHandler}>Remove</Button>
          {/* <button onClick={decreaseHandler}>−</button>
          <button onClick={increaseHandler}>+</button>
          <button onClick={removeitemHandler}>Remove</button> */}
        </div>
      </li>
    </Fragment>
  );
};

export default CartItem;
