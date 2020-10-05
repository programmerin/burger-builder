import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];

const BuildControls = ({
  totalPrice,
  ingredients,
  ingredientAdded,
  ingredientRemoved,
  purchase,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>Current Price : ${totalPrice}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            isDisabled={ingredients[ctrl.type] > 0}
            removed={() => ingredientRemoved(ctrl.type)}
            added={() => ingredientAdded(ctrl.type)}
            key={ctrl.label}
            label={ctrl.label}
          />
        );
      })}
      <button
        onClick={purchase}
        disabled={totalPrice <= 4}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
