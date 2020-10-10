import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Menu} onClick={props.open}>
        <span className={classes.MenuIcon}>&mdash;</span>
        <span className={classes.MenuIcon}>&mdash;</span>
        <span className={classes.MenuIcon}>&mdash;</span>
      </div>
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
