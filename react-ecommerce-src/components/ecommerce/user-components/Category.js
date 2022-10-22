import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";

const Category = (props) => {
  const [categories, setCategories] = useState([]);

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
      // console.log(categoryFetched);
    }
    fetchCategories();
  }, []);

  const handleClick = (id) => e => props.setId(id)

  //console.log(categories);
  return (
    <ul>
      <br></br>
      <CategoryList handleClick={handleClick(null)} title="All Products" description="Clothes, Footwear and Accecories" />
      {categories.map((category) => (
        <CategoryList handleClick={handleClick(category.id)} title={category.title} description={category.description} />
      ))}
    </ul>
  );
};

export default Category;
