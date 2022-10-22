import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";

import { useDispatch } from "react-redux";

import { productActions } from "../../store/store";

import classes from "./Products.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = (props) => {

  let dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const requestData = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  let productsFetched = [];

  //const id = props.id;

  async function fetchProducts(id) {
    const response = await fetch(
      "http://localhost:8080/ecommerce/" +
        `${id ? "category/" + id : "products"}`,
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
        image : productData.image
      };
    });


    const productslist = data.map((item) => {
      return {
          id : item.id,
          title : item.name,
          description : item.description,
          price : item.price,
          stock : item.quantity,
          image : item.image
      }
  });

  
  if( !id ) {
      dispatch(productActions.setProductlist(productslist));            
  }

    setProducts(productsFetched);
  }

  useEffect(() => {
    fetchProducts(props.id);
    return;
  }, [props.id]);

  return (
    <ul>
      <div className={classes["grid-container"]} >
      {products.map((product) => (
        <div className={classes["grid-item"]} >
        <ProductList
          key = {product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          stock={product.quantity}
          description={product.description}
          image={product.image}
        />
        </div>
      ))}
      </div>
    </ul>
  );
};

export default Products;
