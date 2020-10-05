import React, { Component } from "react";

import BuildControls from "../../components/Layout/Burger/BuildControls/BuildControls";
import Burger from "../../components/Layout/Burger/Burger";
import OrderSummary from "../../components/Layout/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/Layout/UI/Backdrop/Backdrop";
import Modal from "../../components/Layout/UI/Modal/Modal";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurderBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasing: false,
  };

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
    this.purchasingHandler(false);
    alert("You Continue");
  };

  render() {
    return (
      <>
        <Backdrop
          click={() => this.purchasingHandler(false)}
          show={this.state.purchasing}
        />
        <Modal show={this.state.purchasing}>
          <OrderSummary
            price={this.state.totalPrice.toFixed(2)}
            purchaseContinue={this.purchaseContinue}
            isPurchase={this.purchasingHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchase={() => this.purchasingHandler(true)}
          totalPrice={this.state.totalPrice.toFixed(2)}
          ingredients={this.state.ingredients}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
        />
      </>
    );
  }
}

export default BurderBuilder;
