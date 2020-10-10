import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          name={props.name}
          onChange={props.onChange}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          name={props.name}
          onChange={props.onChange}
          className={classes.InputElement}
        >
          {props.elementConfig.options.map((option, idx) => (
            <option
              selected={idx === 1 ? true : false}
              key={option.value}
              value={option.value}
            >
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          name={props.name}
          onChange={props.onChange}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    default:
      inputElement = (
        <input
          name={props.name}
          className={classes.InputElement}
          onChange={props.onChange}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
