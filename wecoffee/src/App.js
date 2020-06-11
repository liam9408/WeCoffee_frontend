import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import "./App.css";

function App() {
  return (
    <div className="App" id="main-body">
      {/* <h1>WeCoffee</h1> */}
      <div id="logo"></div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      {/* <Switch>
        <Route exact path="/" component={Order} />
        <Route exact path="/order-submitted" component={OrderSubmitted} />
        <Route path="*" component={NotFound} />
      </Switch> */}
    </div>
  );
}

export default App;
