import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";

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

const UserLogin = (props) => {
  useEffect(() => {}, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let isEnabled = username.length > 0 && password.length > 0;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    props.verifyMDP(username, password);
  };

  return (
    <>
      <h3>Login</h3>
      <div id="order-body">
        <div id="order-form-container">
          <form id="form">
            <div className="ray-text-area">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="name"
                placeholder="Username"
                id="your-name"
                onChange={handleUsernameChange}
              ></input>
            </div>
            <div className="ray-text-area" id="autocomplete-container">
              <input
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="office-number"
                placeholder="Password"
                id="office-number"
                onChange={handlePasswordChange}
              ></input>
            </div>
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
          </form>
        </div>
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

UserLogin.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
