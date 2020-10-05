import React from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = ({ ingredients, purchaseContinue, isPurchase, price }) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul style={{ listStyleType: "none" }}>{ingredientSummary}</ul>
      <p>
        <strong>Total Price : {price}</strong>
      </p>
      <Button btnType="Danger" clicked={() => isPurchase(false)}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={() => purchaseContinue()}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
