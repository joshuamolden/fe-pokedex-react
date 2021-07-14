import React from "react";
import { Heading } from "@chakra-ui/layout";

const Header = (props: any): React.ReactElement => (
  <Heading
    as="h1"
    mb="50px"
    display="flex"
    justifyContent="space-around"
    h="90px"
  >
    {props.children}
  </Heading>
);
export default Header;
