import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Order from "./Pages/Order";
import NotFound from "./Pages/NotFound";
import Barista from "./Pages/Barista";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import UserLogin from "./Pages/UserLogin";
import Signup from "./Pages/SignUp";

import * as authActions from "../src/store/actions/auth/authActions";

const Routes = (props) => {
  const auth = props.authMSP;
  if (auth.isLoggedIn) {
    if (auth.userType === "admin") {
      return (
        <Switch>
          <Redirect exact from="/" to="/order" />
          <Route exact path="/order" component={Order} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/barista" component={Barista} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/SignUp" component={Signup} />
          <Route exact path="/us3rl0g1n" component={UserLogin} />
          <Route path="*" component={NotFound} />
          <Redirect to="*" />
        </Switch>
      );
    }
    if (auth.userType === "barista") {
      return (
        <Switch>
          <Redirect exact from="/" to="/barista" />
          <Route exact path="/order" component={Order} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/barista" component={Barista} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/SignUp" component={Signup} />
          <Route exact path="/us3rl0g1n" component={UserLogin} />
          <Route path="*" component={NotFound} />
          <Redirect to="*" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/order" />
          <Route exact path="/order" component={Order} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/barista" component={Barista} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/SignUp" component={Signup} />
          <Route exact path="/us3rl0g1n" component={UserLogin} />
          <Route path="*" component={NotFound} />
          <Redirect to="*" />
        </Switch>
      );
    }
  } else {
    return (
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/us3rl0g1n" component={UserLogin} />
        </Switch>
        <Redirect to="/us3rl0g1n" />
      </>
    );
  }

  // if (props.authMSP.isLoggedIn) {
  //   return (
  //     <Switch>
  //       <Redirect exact from="/" to="/order" />
  //       <Route exact path="/order" component={Order} />
  //       <Route exact path="/login" component={Login} />
  //       <Route exact path="/barista" component={Barista} />
  //       <Route exact path="/admin" component={Admin} />
  //       <Route exact path="/SignUp" component={Signup} />
  //       <Route exact path="/us3rl0g1n" component={UserLogin} />
  //       <Route path="*" component={NotFound} />
  //       <Redirect to="*" />
  //     </Switch>
  //   );
  // } else {
  //   return (
  //     <>
  //       <Switch>
  //         <Route exact path="/login" component={Login} />
  //       </Switch>
  //       <Redirect to="/login" />
  //     </>
  //   );
  // }

  // if isLoggedIn allow access to pages
  // check userType and render corresponding pages

  // if !isLoggedIn return to userlogin

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
  authMSP: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDispatch: () => {
    dispatch(authActions.logoutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
