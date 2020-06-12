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

const Admin = (props) => {
  useEffect(() => {
    props.coffeeMDP();
    props.milkMDP();
  }, []);

  return (
    <>
      <h1>Admin</h1>
      <div id="spacer"></div>
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
              ></input>
            </div>
            <button className="admin-add-button">Add</button>
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
              ></input>
            </div>
            <button className="admin-add-button">Add</button>
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

Admin.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
