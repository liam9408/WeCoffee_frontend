import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";

const Barista = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>8 Orders In Queue</h1>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Iced Latte w/ 2% Milk</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">DONE</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Hot Latte w/ Normal Milk</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">DONE</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Iced Americano</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">DONE</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Hot Americano</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">DONE</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Iced Latte w/ 2% Milk</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">DONE</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authMSP: state.auth.authRootReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyMDP: (token) => dispatch(authActions.loginThunk(token)),
  };
};

Barista.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Barista);
