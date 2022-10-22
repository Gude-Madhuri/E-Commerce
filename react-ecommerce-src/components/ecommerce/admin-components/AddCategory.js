import React, { useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import classes from "./AddCategory.module.css";



const AddCategory = (props) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();

  const [addedCategory, setAddedCategory] = useState(false);

  async function addCategoryHandler(event) {
    event.preventDefault();

    if ( title.trim().length === 0 ) {
      setAddedCategory(false);
      setError("Title should not be empty");
      return;
    }

    const requestData = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    };

    try{
      const response = await fetch(
        "http://localhost:8080/ecommerce/category",
        requestData
      );
      const data = await response.json();

      if(!response.ok){
        throw new Error();
      }else{
        setAddedCategory(true);
        setError(null);
        console.log(data);
      }

    }catch(error){
      setAddedCategory(false);
      setError("Category Already exists");
    }
    

    setTitle("");
    setDescription("");
  }

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const classCardName = `${classes.input} ${classes.modal}`;

  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classCardName} >
        <h4 className={classes.header} >ADD CATEGORY</h4>
        {addedCategory && <p>Category added Successfully</p>}
        {error && <p style={{color:"red"}}>{error}</p> }
        <form onSubmit={addCategoryHandler}>
          {/* <h3 style={{color:"white", background:"#0a6c7e" }} >ADD CATEGORY</h3> */}
          <label>Title*</label>
          <input type="text" value={title} onChange={titleChangeHandler} />

          
          <br></br>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={descriptionChangeHandler}
          />

          
          <br></br>

          <Button type="submit">Add Category</Button>
          <Button className={classes.actions} onClick={props.onConfirm}>Close</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddCategory;
