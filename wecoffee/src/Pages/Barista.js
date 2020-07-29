import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as authActions from "../store/actions/auth/authActions";

import OrderCard from "../Components/OrderCard";
import NavBar from "../Components/NavBar";
import axios from "axios";
import moment from "moment";

const Barista = (props) => {
  const [liveOrders, setLiveOrders] = React.useState([]);
  const token = localStorage.getItem("token");

  const updateCoffeeList = (order) => {
    setLiveOrders([...order]);
  };

  const getOrders = () => {
    return axios(`${process.env.REACT_APP_API_SERVER}/orders/get-orders/`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        const orders = res.data;
        updateCoffeeList(orders);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDone = (orderId) => {
    console.log(orderId);
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/orders/done`,
      data: { orderId: orderId },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        getOrders();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getOrders(token);
  }, []);

  return (
    <>
      {props.authMSP.userType === "admin" ? <NavBar /> : null}

      <h1>{liveOrders.length} Orders In Queue</h1>

      {liveOrders.map((order, index) => {
        const name = order.name;
        const coffeeType = order.coffee;
        const milkType = order.milk;
        const coffee = `${coffeeType} w/ ${milkType} milk`;
        const time = moment(order.order_time).format("MMMM Do YYYY, h:mm:ss a");
        const orderId = order.id;

        return (
          <OrderCard
            type={coffee}
            name={name}
            time={time}
            orderId={orderId}
            onDone={onDone}
          />
        );
      })}

      <div id="spacer"></div>
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
    verifyMDP: (token) => dispatch(authActions.loginThunk(token)),
  };
};

Barista.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Barista);
