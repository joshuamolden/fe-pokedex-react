import React from "react";
import { Heading } from "@chakra-ui/layout";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Header = (props: any): React.ReactElement => (
  <Heading
    as="h1"
    mb="50px"
    display="flex"
    justifyContent="space-around"
    h="90px"
    title="header"
  >
    {props.children}
  </Heading>
);
export default Header;
