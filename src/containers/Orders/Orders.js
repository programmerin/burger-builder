import React, { Component } from "react";
import axios from "../.././axios.orders";

import Order from "../../components/Order/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then(({ data }) => {
        this.setState(() => {
          return { loading: false };
        });
        const transformedData = Object.values(data);
        this.setState(() => {
          return { orders: transformedData };
        });
      })
      .catch((err) => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order, idx) => {
          return (
            <Order
              key={idx}
              customer={order.customer}
              delievery={order.delieveryMethod}
              price={order.price}
              ingredients={order.ingredients}
            />
          );
        })}
      </div>
    );
  }
}

export default Orders;
