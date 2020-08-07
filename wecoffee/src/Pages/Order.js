import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const Title = styled.h1`
  margin-bottom: 0px;
`;

const SubText = styled.h3``;

const OrderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a``;

const cupOptions = [
  {
    id: 0,
    name: "I have my own mug!",
  },
  {
    id: 1,
    name: "Oops! I'll bring my own next time!",
  },
];

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
  const [cup, setCup] = useState("");
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
    const coffeeId = parseInt(coffee[0]);
    const coffeeName = coffee.slice(1, coffee.length);
    const milkId = parseInt(milk[0]);
    const milkType = milk.slice(1, milk.length);
    const cupId = parseInt(cup[0]);
    setSubmitted(true);
    console.log(token);
    props.addOrderMDP(
      coffeeId,
      coffeeName,
      milkId,
      milkType,
      name,
      officeId,
      cupId,
      token
    );
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

  const handleCupChange = (e) => {
    setCup(e.target.value);
  };

  if (open === false) {
    return <Title>We are not yet open. Please come back later.</Title>;
  }

  return (
    <>
      {!submitted && (
        <>
          {props.authMSP.userType === "admin" ? <NavBar /> : null}
          <Title>New Coffee Order</Title>
          <SubText>Submit an order below and grab your coffee</SubText>
          <OrderBody>
            <FormContainer>
              <Form>
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
                <Select
                  type="text"
                  name="cup"
                  id="cup"
                  onChange={handleCupChange}
                  options={cupOptions}
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
              </Form>
            </FormContainer>
          </OrderBody>
        </>
      )}
      {submitted && (
        <>
          <Title>Success!</Title>
          <SubText>
            Your order has been submitted. Please collect your order on the 20th
            floor.
          </SubText>
          <Link href="/">Place another order</Link>
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
    addOrderMDP: (coffeeId, coffeeName, milkId, milkName, name, officeId, cupId, token) =>
      dispatch(
        coffeeActions.addOrder(
          coffeeId,
          coffeeName,
          milkId,
          milkName,
          name,
          officeId,
          cupId,
          token
        )
      ),
  };
};

Order.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
