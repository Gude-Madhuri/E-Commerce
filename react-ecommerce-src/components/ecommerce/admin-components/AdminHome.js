import React, { Fragment, useEffect, useState } from "react";

import Button from "../../UI/Button";
import Card from "../../UI/Card";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";

import { useSelector, useDispatch } from "react-redux";
import { authActions, userActions } from "../../store/store";

import { productActions } from "../../store/store";

import classes from "./AdminHome.module.css";
import AdminHeader from "./AdminHeader";

const AdminHome = (props) => {
  let dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);
  const [addProductVisible, setAddProductVisible] = useState(false);

  const categoryHandler = () => {
    setAddCategoryVisible(true);
  };
  const productHandler = () => {
    setAddProductVisible(true);
  };

  const closeCategoryHandler = () => {
    setAddCategoryVisible(false);
  };

  const closeProductHandler = () => {
    setAddProductVisible(false);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const requestData = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  let productsFetched = [];

  async function fetchProducts() {
    const response = await fetch(
      "http://localhost:8080/ecommerce/products",
      requestData
    );
    const data = await response.json();

    productsFetched = data.map((productData) => {
      return {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        description: productData.description,
        image: productData.image,
      };
    });

    const productslist = data.map((item) => {
      return {
        id: item.id,
        title: item.name,
        description: item.description,
        price: item.price,
        stock: item.quantity,
      };
    });

    dispatch(productActions.setProductlist(productslist));
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <AdminHeader
        categoryHandler={categoryHandler}
        productHandler={productHandler}
        logoutHandler={logoutHandler}
      />

      {addCategoryVisible && <AddCategory onConfirm={closeCategoryHandler} />}
      {addProductVisible && <AddProduct onConfirm={closeProductHandler} />}
    </Fragment>
  );
};

export default AdminHome;
