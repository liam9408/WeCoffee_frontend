import React from "react";
import styled, { css } from "styled-components";

const styles = css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  display: flex;
  border: 0.0625rem solid blue;
  font-family: "Apercu Mono", SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  background-color: blue;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  padding-left: 44px;
  white-space: nowrap;
  text-align: center !important;
  vertical-align: bottom;
  width: 120px;
  height: 3.5rem;
  margin-left: 20px;
  padding-top: 18px;

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
    padding-left: 34px;
  }
  @media only screen and (min-device-width: 360px) and (max-device-width: 640px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    padding-left: 34px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
    padding-left: 34px;
  }
`;

const StyledButton = styled.button`
  ${styles}
`;

const DelButton = ({ children, ...props }) => {
  return <StyledButton {...props}> {children} </StyledButton>;
};

export default DelButton;
