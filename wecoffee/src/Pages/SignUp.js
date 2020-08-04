import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "../Components/NavBar";
import AccessDenied from "./AccessDenied";
import * as authActions from "../store/actions/auth/authActions";

import styled from "styled-components";

import Input from "../Components/Input";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  margin-bottom: 20px;
`;

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

const SignUp = (props) => {
  useEffect(() => {}, []);

  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");

  let isEnabled = username.length > 0 && password.length > 0;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    props.signUpMDP(username, userType, password);
  };

  if (props.authMSP.userType !== "admin") {
    return <AccessDenied />;
  }

  return (
    <>
      <NavBar />
      <ToastContainer />
      <Title>SignUp</Title>
      <OrderBody>
        <FormContainer>
          <Form id="form">
            <Input
              className="input-textfield"
              style={inputTextfield}
              type="text"
              name="name"
              placeholder="Username"
              id="your-name"
              onChange={handleUsernameChange}
            />
            <div className="ray-text-area">
              <select
                style={inputTextfield}
                type="text"
                name="usertype"
                placeholder="User Type"
                id="user-type"
                onChange={handleUserTypeChange}
              >
                <option value="default" disabled selected>
                  Choose usertype
                </option>
                <option value="admin">Admin</option>
                <option value="barista">Barista</option>
              </select>
            </div>
            <Input
              className="input-textfield"
              style={inputTextfield}
              type="password"
              name="office-number"
              placeholder="Password"
              id="office-number"
              onChange={handlePasswordChange}
            />
            <input
              id={
                !isEnabled
                  ? "order-submit-button-disabled"
                  : "order-submit-button"
              }
              type="submit"
              value="Sign Up"
              onClick={handleSubmit}
              disabled={!isEnabled}
            ></input>
          </Form>
        </FormContainer>
      </OrderBody>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authMSP: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpMDP: (username, userType, password) =>
      dispatch(authActions.signupThunk(username, userType, password)),
  };
};

SignUp.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
