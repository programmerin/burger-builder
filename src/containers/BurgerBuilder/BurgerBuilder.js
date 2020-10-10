import React, { Component } from "react";

import BuildControls from "../../components/Layout/Burger/BuildControls/BuildControls";
import Burger from "../../components/Layout/Burger/Burger";
import OrderSummary from "../../components/Layout/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/Layout/UI/Backdrop/Backdrop";
import Modal from "../../components/Layout/UI/Modal/Modal";
import axios from "../../axios.orders";
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import withErrorHandling from "../../components/hoc/withErrorHandling/withErrorHandling";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurderBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-ae559.firebaseio.com/ingredients.json")
      .then(({ data }) => {
        const totalPrice = Object.keys(data)
          .map((item) => {
            return INGREDIENT_PRICES[item] * data[item];
          })
          .reduce((prev, curr) => prev + curr, 0);

        this.setState({
          ingredients: data,
          totalPrice: this.state.totalPrice + totalPrice,
        });
      });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
      ingredients: updatedIngredients,
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (!oldCount) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
      ingredients: updatedIngredients,
    });
  };

  purchasingHandler = (show) => {
    this.setState({ purchasing: show });
  };

  purchaseContinue = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("totalPrice=" + this.state.totalPrice.toFixed(2));
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    return (
      <>
        <Backdrop
          click={() => this.purchasingHandler(false)}
          show={this.state.purchasing}
        />
        <Modal show={this.state.purchasing}>
          {this.state.loading ? (
            <Spinner />
          ) : this.state.ingredients ? (
            <OrderSummary
              price={this.state.totalPrice.toFixed(2)}
              purchaseContinue={this.purchaseContinue}
              isPurchase={this.purchasingHandler}
              ingredients={this.state.ingredients}
            />
          ) : null}
        </Modal>

        {this.state.ingredients ? (
          <>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              purchase={() => this.purchasingHandler(true)}
              totalPrice={this.state.totalPrice.toFixed(2)}
              ingredients={this.state.ingredients}
              ingredientRemoved={this.removeIngredientHandler}
              ingredientAdded={this.addIngredientHandler}
            />
          </>
        ) : null}
      </>
    );
  }
}

export default withErrorHandling(BurderBuilder, axios);
