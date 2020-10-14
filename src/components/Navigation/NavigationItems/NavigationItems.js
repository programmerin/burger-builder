import React from "react";
import { connect } from "react-redux";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = ({ userId }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {userId ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {userId ? (
      <NavigationItem link="/logout">LOG OUT</NavigationItem>
    ) : (
      <NavigationItem link="/auth">LOG IN</NavigationItem>
    )}
  </ul>
);

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(navigationItems);
