import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";

import OrderCard from "../Components/OrderCard";

const Barista = (props) => {
  const [data, setData] = React.useState([]);

  const updateCoffeeList = (order) => {
    setData([...order]);
  };

  useEffect(() => {
    let eventSource = new EventSource(
      "http://localhost:8000/orders/live-orders"
    );
    eventSource.onmessage = (e) => updateCoffeeList(JSON.parse(e.data));
  }, []);

  return (
    <>
      <h1>8 Orders In Queue</h1>
      <OrderCard type="Iced Latte w/ 2% Milk" name="Liam Leung" />
      <OrderCard type="Iced Americano" name="Liam Leung" />
      <OrderCard type="Hot Americano" name="Liam Leung" />
      <OrderCard type="Iced Latte w/ 2% Milk" name="Liam Leung" />
      <OrderCard type="Hot Latte w/ Normal Milk" name="Liam Leung" />

      {/* <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Iced Latte w/ 2% Milk</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">Done</button>
      </div> 
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Hot Latte w/ Normal Milk</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">Done</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Iced Americano</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">Done</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Hot Americano</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">Done</button>
      </div>
      <div className="order-card">
        <div className="order-content">
          <h2 className="order-type">Iced Latte w/ 2% Milk</h2>
          <h4 className="order-name">Liam Leung</h4>
        </div>
        <button className="done-button">Done</button>
      </div> */}
      <div id="spacer"></div>
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
