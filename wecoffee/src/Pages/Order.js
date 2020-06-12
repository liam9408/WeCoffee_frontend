import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";
import * as milkActions from "../store/actions/milk/milkActions";
import * as coffeeActions from "../store/actions/coffee/coffeeActions";
import * as officeActions from "../store/actions/office/officeActions";

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
    props.officeMDP();
  }, []);

  const [name, setName] = useState("");
  const [officeId, setOffice] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [coffee, setCoffee] = useState("");
  const [milk, setMilk] = useState("");
  const [officeSuggestions, setOfficeSuggestions] = useState([]);
  const [isHidden, setHidden] = useState(true);

  let isEnabled =
    name.length > 0 &&
    officeNumber.length > 0 &&
    coffee.length > 0 &&
    milk.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("your-name").value;
    const coffee = document.getElementById("coffee").value;
    const milk = document.getElementById("milk").value;
    const coffeeId = parseInt(coffee[0]);
    const coffeeName = coffee.slice(1, coffee.length);
    const milkId = parseInt(milk[0]);
    const milkType = milk.slice(1, milk.length);
    props.addOrderMDP(coffeeId, coffeeName, milkId, milkType, name, officeId);
    // props.history.push("/order-submitted");
  };

  const handleOfficeChange = (e) => {
    let param = e.target.value;
    let items = [...props.officeMSP];
    var data = items.filter(function (item) {
      return item.number.includes(param);
    });
    setOfficeSuggestions(data);
    setOfficeNumber(param);
    if (param.length === 0) {
      setHidden(true);
      resetOfficeSuggestions();
    }
    setHidden(false);
  };

  const autoCompleteHandleClick = (event) => {
    event.preventDefault();
    const officeId = event.target.value;
    const officeNumber = event.target.id;
    setOffice(officeId);
    setOfficeNumber(officeNumber);
    setHidden(true);
  };

  const resetOfficeSuggestions = () => {
    setHidden(true);
    setOfficeSuggestions([]);
  };

  const handleCoffeeChange = (e) => {
    setCoffee(e.target.value);
  };

  const handleMilkChange = (e) => {
    setMilk(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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
                placeholder="Your Name (required)"
                id="your-name"
                onChange={handleNameChange}
              ></input>
            </div>
            <div className="ray-text-area" id="autocomplete-container">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="office-number"
                value={officeNumber}
                placeholder="Office Number (required)"
                id="office-number"
                onChange={handleOfficeChange}
              ></input>
              <div id="search-list" hidden={isHidden}>
                {officeSuggestions.map((item, index) => {
                  return (
                    <>
                      <li
                        className="search-items"
                        onClick={autoCompleteHandleClick}
                        id={item.number}
                        value={item.id}
                      >
                        {item.number}
                      </li>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="ray-text-area">
              <select
                className="selector"
                type="text"
                name="coffee"
                id="coffee"
                onChange={handleCoffeeChange}
              >
                <option value="coffee1" disabled selected>
                  Choose coffee
                </option>
                {props.coffeeMSP.map((item, index) => {
                  return (
                    <>
                      <option value={item.id + item.name}>{item.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="ray-text-area">
              <select
                className="selector"
                type="text"
                name="milk"
                id="milk"
                onChange={handleMilkChange}
              >
                <option value="coffee1" disabled selected>
                  Choose milk
                </option>
                {props.milkMSP.map((item, index) => {
                  return (
                    <>
                      <option value={item.id + item.type}>{item.type}</option>
                    </>
                  );
                })}
              </select>
            </div>

            <input
              id={
                !isEnabled
                  ? "order-submit-button-disabled"
                  : "order-submit-button"
              }
              type="submit"
              value="Submit Order"
              onClick={handleSubmit}
              disabled={!isEnabled}
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
    officeMSP: state.office.officeRootReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyMDP: (token) => dispatch(authActions.loginThunk(token)),
    coffeeMDP: () => dispatch(coffeeActions.loadCoffee()),
    milkMDP: () => dispatch(milkActions.loadMilk()),
    officeMDP: () => dispatch(officeActions.loadOffice()),
    addOrderMDP: (coffeeId, coffeeName, milkId, milkName, name, officeId) =>
      dispatch(
        coffeeActions.addOrder(
          coffeeId,
          coffeeName,
          milkId,
          milkName,
          name,
          officeId
        )
      ),
  };
};

Order.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
