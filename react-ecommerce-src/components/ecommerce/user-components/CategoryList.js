import React from "react";
import Card from "../../UI/Card";

import classes from "./CategoryList.module.css";

const CategoryList = (props) => {
  return (
      <div onClick={props.handleClick} className={classes.div}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
  );
};

export default CategoryList;
