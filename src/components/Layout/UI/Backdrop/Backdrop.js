import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = ({ show, click }) => {
  return show ? <div onClick={click} className={classes.Backdrop}></div> : null;
};

export default Backdrop;
