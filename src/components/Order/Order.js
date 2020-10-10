import React from "react";

import classes from "./Order.module.css";

const Order = ({ ingredients, customer, delievery, price }) => {
  const ingredientsKeys = Object.keys(ingredients);
  const transformedIngredients = ingredientsKeys.map((ingredientKey) => {
    return ingredients[ingredientKey] ? (
      <li
        key={ingredientKey}
        style={{
          fontWeight: "bold",
          boxShadow: "1px 1px 3px #ccc",
          display: "inline-block",
          marginLeft: "10px",
          padding: "5px 10px",
          textTransform: "capitalize",
        }}
      >
        {ingredientKey} : {ingredients[ingredientKey]}
      </li>
    ) : null;
  });

  return (
    <div className={classes.Order}>
      <p>Name: {customer.name}</p>
      <p>{customer.address.street}</p>
      <p>{customer.address.zipCode}</p>
      <p>{customer.address.country}</p>
      <ul style={{ listStyle: "none", padding: "10px 30px" }}>
        {transformedIngredients}
      </ul>
      <p>
        Price: <strong>USD : {price}</strong>
      </p>
      <p>Delievery Method : {delievery}</p>
    </div>
  );
};

export default Order;
