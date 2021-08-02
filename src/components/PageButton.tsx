import React from "react";
import { IconButton, Container } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { fromParent } from "./Types";

function PageButton(props: fromParent): React.ReactElement {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1"
      title={"div"}
    >
      {props.displayButton ? (
        props.direction === "left" ? (
          <IconButton
            onClick={props.onClick}
            aria-label="Back"
            icon={<ArrowBackIcon fontSize="30px" />}
            borderRadius="50%"
            bgColor="background.900"
            h="50px"
            w="50px"
            color="white"
            _focus={{ border: "none" }}
            title={"left"}
          />
        ) : (
          <IconButton
            onClick={props.onClick}
            aria-label="Forward"
            icon={<ArrowForwardIcon fontSize="30px" />}
            borderRadius="50%"
            bgColor="background.900"
            h="50px"
            w="50px"
            color="white"
            _focus={{ border: "none" }}
            title={"right"}
          />
        )
      ) : (
        <div />
      )}
    </Container>
  );
}
export default PageButton;
