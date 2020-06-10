import React from "react";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submited");
    props.history.push("/order-submitted");
  };
  return (
    <>
      <h1>New Coffee Order</h1>
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
                placeholder="Your Number"
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
                <option value="coffee3">20%</option>
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

export default Order;
