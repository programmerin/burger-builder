import React from "react";
import { withRouter } from "react-router-dom";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div
    className={classes.Logo}
    style={{ height: props.height, cursor: "pointer" }}
    onClick={() => props.history.push("/")}
  >
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default withRouter(logo);
