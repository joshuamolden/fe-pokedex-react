import React from "react";
import { IconButton, Container } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const PageButton = ({
  direction,
  displayButton,
  onClick,
}: DisplayButton): React.ReactElement => {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1"
      title={"div"}
    >
      {displayButton ? (
        direction === "left" ? (
          <IconButton
            onClick={onClick}
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
            onClick={onClick}
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
      ) : null}
    </Container>
  );
};
export default PageButton;
