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

const styledList = css`
  list-style-type: none;
  font-family: "Apercu", SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 25px;
  height: 50px;
  padding-left: 20px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  li:hover {
    /* background-color: #dbdbdb; */
    color: white;
    background-color: blue;
  }
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
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 10px;
  margin-bottom: 10px;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
`;

const AutoCompleteDiv = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 55px;
  max-width: 302px;
  margin-left: 15px;
  left: -16px;
  right: -16px;
  height: auto;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const StyledList = styled.li`
  ${styledList}
`;

const AutoCompleteInput = ({
  isHidden,
  suggestions,
  style,
  type,
  name,
  value,
  placeholder,
  id,
  onChange,
  ...props
}) => {
  return (
    <StyledDiv>
      <StyledInput
        style={style}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
      <AutoCompleteDiv hidden={isHidden}>
        {suggestions.map((item, index) => {
          return (
            <>
              <StyledList id={item.number} value={item.id} {...props}>
                {item.number}
              </StyledList>
            </>
          );
        })}
      </AutoCompleteDiv>
    </StyledDiv>
  );
};

export default AutoCompleteInput;
