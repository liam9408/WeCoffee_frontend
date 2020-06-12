import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";
import * as milkActions from "../store/actions/milk/milkActions";
import * as coffeeActions from "../store/actions/coffee/coffeeActions";

const inputTextfield = {
  fontFamily: "inherit",
  borderRadius: ".25rem;",
  width: "100%",
  fontSize: "1rem",
  display: "block",
  backgroundColor: "transparent",
  padding: "0.6875rem",
  outline: "0",
  border: "0",
  cursor: "text",
  lineHeight: "30px",
};

const Order = (props) => {
  useEffect(() => {
    props.coffeeMDP();
    props.milkMDP();
  }, [props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push("/order-submitted");
  };

  console.log(props.coffeeMSP);
  console.log(props.milkMSP);

  return (
    <>
      <h1 id="order-title">New Coffee Order</h1>
      <h3>Submit an order below and grab your coffee</h3>
      <div id="order-body">
        <div id="order-form-container">
          <form id="form">
            <div className="ray-text-area">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="name"
                placeholder="Your Name"
              ></input>
            </div>
            <div className="ray-text-area">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="office-number"
                placeholder="Office Number"
              ></input>
            </div>
            <div className="ray-text-area">
              <select className="selector" type="text" name="coffee">
                <option value="coffee1" disabled selected>
                  Choose coffee
                </option>
                <option value="coffee2">Iced Latte</option>
                <option value="coffee3">Hot Latte</option>
                <option value="coffee4">Americano</option>
              </select>
            </div>
            <div className="ray-text-area">
              <select className="selector" type="text" name="milk">
                <option value="coffee1" disabled selected>
                  Choose milk
                </option>
                <option value="coffee2">Skimmed</option>
                <option value="coffee3">2%</option>
                <option value="coffee4">Full</option>
              </select>
            </div>

            <input
              id="order-submit-button"
              type="submit"
              value="Submit Order"
              onClick={handleSubmit}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authMSP: state.auth.authRootReducer,
    coffeeMSP: state.coffee.coffeeRootReducer,
    milkMSP: state.milk.milkRootReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyMDP: (token) => dispatch(authActions.loginThunk(token)),
    coffeeMDP: () => dispatch(coffeeActions.loadCoffee()),
    milkMDP: () => dispatch(milkActions.loadMilk()),
  };
};

Order.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
