import React from "react";
import Modal from "../../Layout/UI/Modal/Modal";

const withErrorHandling = (Component, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
        }
      );
    }
    modelClosedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal modelClosed={this.modelClosedHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Component {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandling;
