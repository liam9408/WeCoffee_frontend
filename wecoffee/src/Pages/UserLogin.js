import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";
import styled from "styled-components";

import Input from "../Components/Input";

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

const Login = (props) => {
  useEffect(() => {
    console.log('hello')
    autoLogin('weworkcoffeedrinker2020','superWewOrkCofeeDrinker2020')
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let isEnabled = username.length > 0 && password.length > 0;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const autoLogin = (username, password) =>{
    props.verifyMDP(username, password);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.verifyMDP(username, password);
  };

  return (
    <>
      <Title>Login</Title>
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
              value="Login"
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
    verifyMDP: (username, password) =>
      dispatch(authActions.loginThunk(username, password)),
  };
};

Login.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
