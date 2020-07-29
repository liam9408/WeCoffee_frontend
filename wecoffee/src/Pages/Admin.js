import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import AccessDenied from "./AccessDenied";
import NavBar from "../Components/NavBar";
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

const Admin = (props) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    props.coffeeMDP(token);
    props.milkMDP(token);
  }, []);

  const [coffee, setCoffee] = useState("");
  const [milk, setMilk] = useState("");

  const handleCoffeeChange = (e) => {
    setCoffee(e.target.value);
  };

  const handleMilkChange = (e) => {
    setMilk(e.target.value);
  };

  const handleCoffeeSubmit = () => {
    props.addCoffee(token, coffee);
  };

  const handleMilkSubmit = () => {
    props.addMilk(token, milk);
  };

  if (props.authMSP.userType !== "admin") {
    return <AccessDenied />;
  }

  return (
    <>
      <NavBar />
      <h1>Admin</h1>
      <div id="admin-body">
        <div className="with-image">
          <div id="coffee-icon"></div>
          <div id="admin-edit-coffee">
            <div className="admin-text-area">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="coffee"
                placeholder="Add Coffee"
                id="add-coffee-input"
                onChange={handleCoffeeChange}
              ></input>
            </div>
            <button onClick={handleCoffeeSubmit} className="admin-add-button">
              Add
            </button>
          </div>

          {props.coffeeMSP.map((item, index) => {
            return (
              <>
                <div className="delete-items">
                  <h2 className="edit-item-name">{item.name}</h2>
                  <button className="delete-button" id={item.id}>
                    Delete
                  </button>
                </div>
              </>
            );
          })}
        </div>
        <div className="with-image">
          <div id="milk-icon"></div>
          <div id="admin-edit-coffee">
            <div className="admin-text-area">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="milk"
                placeholder="Add Milk Type"
                id="add-milk-input"
                onChange={handleMilkChange}
              ></input>
            </div>
            <button onClick={handleMilkSubmit} className="admin-add-button">
              Add
            </button>
          </div>
          {props.milkMSP.map((item, index) => {
            return (
              <>
                <div className="delete-items">
                  <h2 className="edit-item-name">{item.type}</h2>
                  <button className="delete-button" id={item.id}>
                    Delete
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authMSP: state.auth,
    coffeeMSP: state.coffee.coffeeRootReducer,
    milkMSP: state.milk.milkRootReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyMDP: (token) => dispatch(authActions.loginThunk(token)),
    coffeeMDP: (token) => dispatch(coffeeActions.loadCoffee(token)),
    milkMDP: (token) => dispatch(milkActions.loadMilk(token)),
    addCoffee: (token, coffee) =>
      dispatch(coffeeActions.addCoffee(token, coffee)),
    addMilk: (token, milk) => dispatch(milkActions.addMilk(token, milk)),
  };
};

Admin.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
