import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as action from "../../store/actions";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
