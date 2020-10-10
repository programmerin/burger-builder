import React from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../Layout/UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  return (
    <>
      <Backdrop show={props.open} click={props.closed} />
      <div
        className={`${classes.SideDrawer} ${
          props.open ? classes.Open : classes.Close
        }`}
      >
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
