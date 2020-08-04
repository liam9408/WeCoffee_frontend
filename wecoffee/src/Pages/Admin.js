import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import AccessDenied from "./AccessDenied";
import NavBar from "../Components/NavBar";
import DelButton from "../Components/DelButton";
import AddButton from "../Components/AddButton";
import ApproveButton from "../Components/ApproveButton";
import Input from "../Components/Input";
import * as authActions from "../store/actions/auth/authActions";
import * as milkActions from "../store/actions/milk/milkActions";
import * as coffeeActions from "../store/actions/coffee/coffeeActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

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

const StyledContainer = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  margin-left: 12vw;
  margin-right: 12vw;
  margin-bottom: 30px;

  @media only screen and (max-width: 768px) {
    margin-left: 10px;
    margin-right: 10px;
    width: 90vw !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    justify-content: center;
  }

  @media only screen and (max-width: 841px) {
    margin-left: 10px;
    margin-right: 10px;
    width: 90vw !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    justify-content: center;
  }

  @media only screen and (max-width: 950px) {
    margin-left: 10px;
    margin-right: 10px;
    width: 90vw !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    justify-content: center;
  }

  @media only screen and (max-width: 1280px) {
    margin-left: 5vw;
    margin-right: 5vw;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    margin-left: 10px;
    margin-right: 10px;
    width: 90vw !important;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 640px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    margin-left: 10px;
    margin-right: 10px;
    width: 90vw !important;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    margin-left: 10px;
    margin-right: 10px;
    width: 90vw !important;
  }
`;

const AdminBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    width: 100% !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  @media only screen and (max-width: 841px) {
    width: 100% !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  @media only screen and (max-width: 950px) {
    width: 100% !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    width: 100vw !important;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 640px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    width: 100vw !important;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    width: 100vw !important;
    flex-direction: column;
    align-items: center;
  }
`;

const WithImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const ItemsContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    width: 300px;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 640px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    width: 300px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    width: 300px;
  }
`;

const ItemName = styled.h2`
  text-align: left;
`;

const Title = styled.h1``;

const Admin = (props) => {
  const token = localStorage.getItem("token");

  const [coffee, setCoffee] = useState("");
  const [milk, setMilk] = useState("");
  const [users, setUsers] = useState([]);

  const loadUsers = (token) => {
    return axios(`${process.env.REACT_APP_API_SERVER}/login/approve`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    props.coffeeMDP(token);
    props.milkMDP(token);
    loadUsers(token);
  }, []);

  const handleCoffeeChange = (e) => {
    setCoffee(e.target.value);
  };

  const handleMilkChange = (e) => {
    setMilk(e.target.value);
  };

  const handleCoffeeSubmit = async () => {
    await props.addCoffee(token, coffee);
    await props.coffeeMDP(token);
  };

  const delCoffee = async (milkId) => {
    await props.delCoffee(token, milkId);
    await props.coffeeMDP(token);
  };

  const handleMilkSubmit = async () => {
    await props.addMilk(token, milk);
    await props.milkMDP(token);
  };

  const delMilk = async (milkId) => {
    await props.delMilk(token, milkId);
    await props.milkMDP(token);
  };

  const approveUser = async (userId) => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/login/approve/`,
      data: { userId: userId },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        toast.success("Approved User");
        loadUsers(token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (props.authMSP.userType !== "admin") {
    return <AccessDenied />;
  }

  return (
    <>
      <NavBar />
      <ToastContainer />
      <Title>Admin</Title>
      <AdminBody id="admin-body">
        <WithImage className="with-image">
          <div id="coffee-icon"></div>
          <StyledContainer>
            <Input
              className="input-textfield"
              style={inputTextfield}
              type="text"
              name="coffee"
              placeholder="Add Coffee"
              id="add-coffee-input"
              onChange={handleCoffeeChange}
            />
            <AddButton onClick={handleCoffeeSubmit}>Add</AddButton>
          </StyledContainer>

          {props.coffeeMSP.map((item, index) => {
            return (
              <>
                <ItemsContainer className="delete-items">
                  <ItemName className="edit-item-name">{item.name}</ItemName>
                  <DelButton
                    className="delete-button"
                    id={item.id}
                    onClick={() => delCoffee(item.id)}
                  >
                    Delete
                  </DelButton>
                </ItemsContainer>
              </>
            );
          })}
        </WithImage>
        <WithImage className="with-image">
          <div id="milk-icon"></div>
          <StyledContainer>
            <Input
              className="input-textfield"
              style={inputTextfield}
              type="text"
              name="milk"
              placeholder="Add Milk Type"
              id="add-milk-input"
              onChange={handleMilkChange}
            />
            <AddButton onClick={handleMilkSubmit}>Add</AddButton>
          </StyledContainer>
          {props.milkMSP.map((item, index) => {
            return (
              <>
                <ItemsContainer className="delete-items">
                  <ItemName className="edit-item-name">{item.type}</ItemName>
                  <DelButton
                    className="delete-button"
                    id={item.id}
                    onClick={() => delMilk(item.id)}
                  >
                    Delete
                  </DelButton>
                </ItemsContainer>
              </>
            );
          })}
        </WithImage>
      </AdminBody>

      <WithImage className="with-image">
        <div id="user-icon"></div>
        <Title>Pending Users</Title>
        {users.map((item, index) => {
          return (
            <>
              <ItemsContainer className="delete-items">
                <ItemName className="edit-item-name">
                  {item.username} - {item.user_type}
                </ItemName>
                <ApproveButton
                  className="delete-button"
                  id={item.id}
                  onClick={() => approveUser(item.id)}
                >
                  Approve
                </ApproveButton>
              </ItemsContainer>
            </>
          );
        })}
      </WithImage>
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
    delCoffee: (token, coffeeId) =>
      dispatch(coffeeActions.delCoffee(token, coffeeId)),
    addMilk: (token, milk) => dispatch(milkActions.addMilk(token, milk)),
    delMilk: (token, milkId) => dispatch(milkActions.delMilk(token, milkId)),
  };
};

Admin.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
