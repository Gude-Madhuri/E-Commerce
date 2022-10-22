import React, { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import ErrorModal from "../../UI/ErrorModal";

import classes from "./Address.module.css";

import { userActions } from "../../store/store";

import { useSelector, useDispatch } from "react-redux";
import PlaceOrder from "./PlaceOrder";

const Address = (props) => {

  let dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
  const userRole = useSelector((state) => state.user.role);
  const userPwd = useSelector((state) => state.user.password);
  const userName = useSelector((state) => state.user.username);
  const userAddress = useSelector((state) => state.user.address);

  const [placeOrderVisible, setPlaceOrderVisible] = useState(false);

  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [phone,setPhone] = useState("");

  const [error, setError] = useState("");


  async function saveAddressHandler(event) {
    event.preventDefault();

    if (
      houseNo.trim().length === 0 ||
      city.trim().length === 0 ||
      state.trim().length === 0 ||
      pin.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      setError(" * Entries should not be empty");
      return;
    }

    try {
      const addValue = `${houseNo} ${street} ${city} ${state} ${pin} ${phone}`;
      console.log(addValue);
      const response = await fetch(
        "http://localhost:8080/ecommerce/updateAddressByUserId?userId=" + `${userId}` + "&address=" + `${addValue}`,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error();
      }else{
        
        dispatch(userActions.setAddress(`${houseNo} ${street} ${city} ${state} ${pin} ${phone}`));
        props.saveAddress();
      }
    } catch (error) {
      setError("Something went wrong");
    }

    setHouseNo("");
    setStreet("");
    setCity("");
    setState("");
    setPin("");
    setPhone("");

  }

  const houseNoHandler = (event) => {
    setHouseNo(event.target.value);
  };

  const streetHandler = (event) => {
    setStreet(event.target.value);
  };

  const cityHandler = (event) => {
    setCity(event.target.value);
  };

  const stateHandler = (event) => {
    setState(event.target.value);
  };

  const pinHandler = (event) => {
    setPin(event.target.value);
  };

  const phoneHandler = (event) =>{
    setPhone(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {/* <PlaceOrder /> */}
      
      {error && <ErrorModal message={error} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={saveAddressHandler}>
          <label>House/Flat No * </label>
          <input type="text" value={houseNo} onChange={houseNoHandler} />
          <br></br>
          <br></br>

          <label>Street</label>
          <input type="text" value={street} onChange={streetHandler} />
          <br></br>
          <br></br>

          <label>City * </label>
          <input type="text" value={city} onChange={cityHandler} />
          <br></br>
          <br></br>

          <label>State *</label>
          <input type="text" value={state} onChange={stateHandler} />
          <br></br>
          <br></br>

          <label>Pin Code *</label>
          <input type="text" value={pin} onChange={pinHandler} />
          <br></br>
          <br></br>

          <label>Phone *</label>
          <input type="text" value={phone} onChange={phoneHandler} />
          <br></br>
          <br></br>

          <Button type="submit" >Save Address </Button>
        </form>

        
        
      </Card>

      {/* {placeOrderVisible && <PlaceOrder />} */}
    </Fragment>
  );
};

export default Address;
