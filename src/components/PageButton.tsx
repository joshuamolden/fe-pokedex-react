import React from "react";
import { IconButton, Container } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function PageButton(props: any): React.ReactElement {
  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      {props.displayButton ? (
        props.direction === "left" ? (
          <IconButton
            aria-label="Back"
            icon={<ArrowBackIcon fontSize="30px" />}
            borderRadius="50%"
            bgColor="background.500"
            h="50px"
            w="50px"
            color="white"
          />
        ) : (
          <IconButton
            aria-label="Forward"
            icon={<ArrowForwardIcon fontSize="30px" />}
            borderRadius="50%"
            bgColor="background.500"
            h="50px"
            w="50px"
            color="white"
          />
        )
      ) : (
        <div />
      )}
    </Container>
  );
}
export default PageButton;
