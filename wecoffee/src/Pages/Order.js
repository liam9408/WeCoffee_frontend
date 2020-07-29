import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";
import * as milkActions from "../store/actions/milk/milkActions";
import * as coffeeActions from "../store/actions/coffee/coffeeActions";
import * as officeActions from "../store/actions/office/officeActions";

import Input from "../Components/Input";
import AutoCompleteInput from "../Components/AutoCompleteInput";
import Select from "../Components/Select";
import NavBar from "../Components/NavBar";

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
  const token = localStorage.getItem("token");

  useEffect(() => {
    props.coffeeMDP(token);
    props.milkMDP(token);
    props.officeMDP(token);
  }, []);

  const [name, setName] = useState("");
  const [officeId, setOffice] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [coffee, setCoffee] = useState("");
  const [milk, setMilk] = useState("");
  const [officeSuggestions, setOfficeSuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isHidden, setHidden] = useState(true);

  let open = false;

  let now = new Date().getHours();

  if (now >= 5 || now < 10) {
    open = true;
  }

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
    setSubmitted(true);
    props.addOrderMDP(coffeeId, coffeeName, milkId, milkType, name, officeId);
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
      setHidden(!isHidden);
      resetOfficeSuggestions();
    } else {
      setHidden(false);
    }
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

  if (open === false) {
    return <h1>We are not yet open. Please come back later.</h1>;
  }

  return (
    <>
      {!submitted && (
        <>
          {props.authMSP.userType === "admin" ? <NavBar /> : null}
          <h1 id="order-title">New Coffee Order</h1>
          <h3>Submit an order below and grab your coffee</h3>
          <div id="order-body">
            <div id="order-form-container">
              <form id="form">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name (required)"
                  id="your-name"
                  onChange={handleNameChange}
                />
                <AutoCompleteInput
                  style={inputTextfield}
                  type="text"
                  name="office-number"
                  value={officeNumber}
                  placeholder="Office Number (required)"
                  id="office-number"
                  onChange={handleOfficeChange}
                  isHidden={isHidden}
                  suggestions={officeSuggestions}
                  onClick={autoCompleteHandleClick}
                />

                <Select
                  type="text"
                  name="coffee"
                  id="coffee"
                  onChange={handleCoffeeChange}
                  options={props.coffeeMSP}
                />
                <Select
                  type="text"
                  name="milk"
                  id="milk"
                  onChange={handleMilkChange}
                  options={props.milkMSP}
                />
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
      )}
      {submitted && (
        <>
          <h1>Success!</h1>
          <h3>
            Your order has been submitted. Please collect your order on the 20th
            floor.
          </h3>
          <a href="/">Place another order</a>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authMSP: state.auth,
    coffeeMSP: state.coffee.coffeeRootReducer,
    milkMSP: state.milk.milkRootReducer,
    officeMSP: state.office.officeRootReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyMDP: (token) => dispatch(authActions.loginThunk(token)),
    coffeeMDP: (token) => dispatch(coffeeActions.loadCoffee(token)),
    milkMDP: (token) => dispatch(milkActions.loadMilk(token)),
    officeMDP: (token) => dispatch(officeActions.loadOffice(token)),
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
