import React from "react";
import { Switch, Route } from "react-router-dom";
import Order from "./Pages/Order";
import OrderSubmitted from "./Pages/OrderSubmitted";
import NotFound from "./Pages/NotFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>WeCoffee</h1>
      <div id="logo"></div>
      <Switch>
        <Route exact path="/" component={Order} />
        <Route exact path="/order-submitted" component={OrderSubmitted} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
