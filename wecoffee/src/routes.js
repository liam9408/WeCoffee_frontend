import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Order from "./Pages/Order";
import OrderSubmitted from "./Pages/OrderSubmitted";
import NotFound from "./Pages/NotFound";
import Barista from "./Pages/Barista";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

import * as authActions from "../src/store/actions/auth/authActions";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Order} />
      <Route exact path="/order-submitted" component={OrderSubmitted} />
      <Route exact path="/barista" component={Barista} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/login" component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
  // return <Route exact path="/login" component={Login} />;
  //   if (props.isLoggedIn) {
  //     return (
  //       <Switch>
  //         <Redirect exact from="/" to="/home" />
  //         <RouteWithLayout
  //           component={HomeView}
  //           exact
  //           layout={NormalLayout}
  //           path="/home"
  //         />
  //         <RouteWithLayout
  //           component={AdminView}
  //           exact
  //           layout={NormalLayout}
  //           path="/admin"
  //         />
  //         <RouteWithLayout
  //           component={NotFoundView}
  //           exact
  //           layout={NormalLayout}
  //           path="/not-found"
  //         />
  //         <Redirect to="/home" />
  //       </Switch>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <RouteWithLayout
  //           component={SignInView}
  //           exact
  //           layout={NormalLayout}
  //           path="/sign-in"
  //         />
  //         <Redirect to="/sign-in" />
  //       </>
  //     );
  //   }
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDispatch: () => {
    dispatch(authActions.logoutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
