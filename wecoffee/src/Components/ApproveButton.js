import React from "react";
import styled, { css } from "styled-components";

const styles = css`
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1;
    display: flex;
    border: 0.0625rem solid blue;
    font-family: "Apercu Mono", SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
    background-color: white;
    color: blue;
    border-radius: 0.25rem;
    cursor: pointer;
    padding-left: 12px;
    white-space: nowrap;
    text-align: center !important;
    vertical-align: bottom;
    width: 80px;
    height: 2.5rem;
    margin-left: 20px;
    padding-top: 12px;

    :hover {
    background-color: rgba(0, 0, 255, 0.226);
`;

const StyledButton = styled.button`
  ${styles}
`;

const DelButton = ({ children, ...props }) => {
  return <StyledButton {...props}> {children} </StyledButton>;
};

export default DelButton;
