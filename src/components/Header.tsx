import React from "react";
import styled from "@emotion/styled";

const HeaderDisplay = styled.h1`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  height: 90px;
`;

const Header = (props: any): React.ReactElement => (
  <HeaderDisplay>{props.children}</HeaderDisplay>
);
export default Header;
