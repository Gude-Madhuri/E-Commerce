import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import classes from "./AddProduct.module.css";

const AddProduct = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState();

  const [error, setError] = useState();
  const [productAdded, setProductAdded] = useState(false);

  const requestData = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  let categoryFetched = [];

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:8080/ecommerce/category",
        requestData
      );
      const data = await response.json();

      categoryFetched = data.map((categoryData) => {
        return {
          id: categoryData.id,
          title: categoryData.title,
          description: categoryData.description,
        };
      });

      setCategories(categoryFetched);
      console.log(categoryFetched);
    }
    fetchCategories();
  }, []);

  async function addProductHandler(event) {

    event.preventDefault();

    if (
      title.trim().length === 0 ||
      price.trim().length === 0 ||
      stock.trim().length === 0 ||
      categoryId.trim().length === 0
    ) {
      
      setError(" * Entries should not be empty");
      setProductAdded(false);
      return;
    }

    const formData = new FormData();

    formData.append('file', image);
    formData.append('pname', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', stock);
    formData.append('categoryid', categoryId);

    // const sendData = {
    //   mode: "cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: title,
    //     description: description,
    //     price:+price,
    //     quantity:+stock,
    //     active:true,
    //     categoryId:+categoryId,
    //   }),
    // };

    try {
      const response = await fetch(
        "http://localhost:8080/ecommerce/addP",
        {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
    
        },
        method: "POST",
        body: formData,
      }
      );

      if (!response.ok) {
        setError("Product Already exists");
        setProductAdded(false);
      }else{
        setProductAdded(true);
        setError(null);
      }
    }catch(error){

    }

    setTitle("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategoryId("");
  }

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const stockChangeHandler = (event) => {
    setStock(event.target.value);
  };

  const categoryIdChangeHandler = (event) => {
    setCategoryId(event.target.value);
  };

  const imageChangeHandler = (event) =>{
    setImage(event.target.files[0]);
  }

  const classCardName = `${classes.input} ${classes.modal}`;

  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />

      <Card className={classCardName}>
        {error && <p style={{color:"red"}} >{error}</p>}
        {productAdded && <p>Product Added Successfully</p>}
        <form onSubmit={addProductHandler}>
          <label>Name*</label>
          <input type="text" value={title} onChange={titleChangeHandler} />

          
          <br></br>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={descriptionChangeHandler}
          />

          
          <br></br>

          <label>Price*</label>
          <input type="text" value={price} onChange={priceChangeHandler} />
          <br></br>
          

          <label>Stock Available*</label>
          <input type="text" value={stock} onChange={stockChangeHandler} />
          <br></br>
          

          <label>Upload Image*</label>
          <input type="file" onChange={imageChangeHandler} />
          <br></br>
          

          <label>Choose Category*</label>
          <select value={categoryId} onChange={categoryIdChangeHandler}>
            <option value="">None</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
          <br></br>
          <br></br>

          <Button type="submit">Add Product</Button>
          <Button className={classes.actions} onClick={props.onConfirm}>
            Close
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
