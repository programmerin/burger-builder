import React, { Component } from "react";
import axios from "../../../axios.orders";

import Button from "../../../components/Layout/UI/Button/Button";
import Input from "../../../components/Layout/UI/Input/Input";
import Spinner from "../../../components/Layout/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
      },
      delieveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "cheapest",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
      },
      delieveryMethod: this.state.orderForm.delieveryMethod.value,
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.props.history.push("/");
        this.setState({ loading: false });
      })
      .catch((err) => this.setState({ loading: false }));
  };

  inputChangeHandler = (event, orderFormKey) => {
    const orderForm = { ...this.state.orderForm };
    orderForm[orderFormKey] = { ...orderForm[orderFormKey] };
    orderForm[orderFormKey].value = event.target.value;
    this.setState({
      orderForm,
    });
  };

  render() {
    const orderForm = this.state.orderForm;
    const transformedOrderForm = Object.keys(orderForm).map((orderFormKey) => {
      return (
        <Input
          name={orderFormKey}
          key={orderFormKey}
          onChange={(e) => this.inputChangeHandler(e, orderFormKey)}
          elementType={orderForm[orderFormKey].elementType}
          elementConfig={orderForm[orderFormKey].elementConfig}
          value={orderForm[orderFormKey].value}
        />
      );
    });

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {transformedOrderForm}
            <Button btnType="Success">ORDER</Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
