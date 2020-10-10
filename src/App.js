import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import BurderBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurderBuilder} />
      </Switch>
    </Layout>
  );
}

export default App;
