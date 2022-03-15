import React from "react";
import { IconButton, Container } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useSearch } from "../../contexts/SearchContext";

const PageButton = ({
  direction,
}: {
  direction: boolean; // true = left, false = right
}): React.ReactElement => {
  const { pageInfo, setPageInfo } = useSearch();
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1"
      title={"div"}
    >
      {direction ? (
        pageInfo.currentPage <= 0 ? null : (
          <IconButton
            onClick={() => {
              setPageInfo({
                currentPage:
                  pageInfo.currentPage === 0 ? 0 : pageInfo.currentPage - 1,
                maxPageNumber: pageInfo.maxPageNumber,
              });
            }}
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
        )
      ) : pageInfo.currentPage >= pageInfo.maxPageNumber ? null : (
        <IconButton
          onClick={() => {
            setPageInfo({
              currentPage:
                pageInfo.currentPage === pageInfo.maxPageNumber
                  ? pageInfo.maxPageNumber
                  : pageInfo.currentPage + 1,
              maxPageNumber: pageInfo.maxPageNumber,
            });
          }}
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
      )}
    </Container>
  );
};
export default PageButton;
