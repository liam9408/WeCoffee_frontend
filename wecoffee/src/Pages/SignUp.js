import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "../Components/NavBar";
import AccessDenied from "./AccessDenied";
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
      <h3>SignUp</h3>
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
            <div className="ray-text-area">
              <select
                className="input-textfield"
                style={inputTextfield}
                type="text"
                name="usertype"
                placeholder="User Type"
                id="your-name"
                onChange={handleUserTypeChange}
              >
                <option value="coffee1" disabled selected>
                  Choose usertype
                </option>
                <option value="coffee1">Admin</option>
                <option value="coffee1">Barista</option>
              </select>
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
              value="Sign Up"
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
