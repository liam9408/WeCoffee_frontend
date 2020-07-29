import React from "react";
import styled, { css } from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin-left: 10px;
  margin-right: 10px;
`;

const NavBar = ({ ...props }) => {
  return (
    <StyledDiv>
      <Link href="/order">Order</Link>
      <Link href="/barista">Barista</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/signup">Signup</Link>
    </StyledDiv>
  );
};

export default NavBar;
