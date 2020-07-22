import React from "react";
import styled, { css } from "styled-components";

const styles = css`
  font-family: inherit;
  border-radius: 0.25rem;
  width: 100%;
  fontsize: 1rem;
  display: block;
  background-color: transparent;
  padding: 0.6875rem;
  outline: 0;
  border: 0;
  cursor: text;
  line-height: 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const StyledInput = styled.input`
  ${styles}
`;

const StyledDiv = styled.div`
  border: 0.0625rem solid #666;
  background-color: #fff;
  border-radius: 0.25rem;
  position: relative;
  height: 3.5rem;
  width: 300px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
`;

const Input = ({ ...props }) => {
  return (
    <StyledDiv>
      <StyledInput {...props} />
    </StyledDiv>
  );
};

export default Input;
