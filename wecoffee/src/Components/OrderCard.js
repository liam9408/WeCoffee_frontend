import React from "react";
import styled, { css } from "styled-components";

const StyledOrderCard = styled.div`
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 800px;
  height: 200px;
  /* padding: 1.5rem 1rem; */
  border-top: 0.0625rem solid #e3e3e3;
  border-left: 0.0625rem solid #e3e3e3;
  border-right: 0.0625rem solid #e3e3e3;
  border-bottom: 0.0625rem solid #e3e3e3;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    width: 80%;
  }
`;

const StyledOrderContent = styled.div`
  width: 600px;
  height: 160px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    margin-left: 20px;
  }
`;

const StyledButton = styled.button`
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  border: 0.0625rem solid blue;
  font-family: "Apercu Mono", SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  background-color: blue;
  color: white;
  border-bottom-right-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  cursor: pointer;
  padding: 45px;
  white-space: nowrap;
  text-align: center !important;
  vertical-align: bottom;
  width: 150px;
  height: 200px;
`;

const Time = styled.h4`
  font-size: 1rem;
`;

const OrderCard = ({ type, name, time, orderId, onDone, ...props }) => (
  <StyledOrderCard>
    <StyledOrderContent>
      <div>
        <h2 className="order-type">{type}</h2>
        <h4 className="order-name">{name}</h4>
      </div>
      <div>
        <Time className="order-name">{time}</Time>
      </div>
    </StyledOrderContent>
    <StyledButton onClick={() => onDone(orderId)}>Done</StyledButton>
  </StyledOrderCard>
);

export default OrderCard;
