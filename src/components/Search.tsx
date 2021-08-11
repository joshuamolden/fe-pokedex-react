/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Search(props: any): React.ReactElement {
  // keeps track of the value of the search input
  const [textValue, setTextValue] = useState<string>("");

  // used to display clear button once a search value is submitted
  const [displayClear, setDisplayClear] = useState<boolean>(false);

  // grabs query string from url
  const { search } = useLocation();

  // sets value of input to the current search criterion
  useEffect(() => {
    const queryString = new URLSearchParams(search);
    const searchParam = queryString.get("search");
    if (searchParam) {
      // will display clear button if refresh happens and there is a search criterion in url
      setDisplayClear(true);
    }
    setTextValue(searchParam ?? "");
  }, []);

  // used to capture when a user presses enter to search for specific pokemon
  const handleSearch = (e: any) => {
    if (e.keyCode === 13) {
      // 13 is the ascii value for the enter key
      props.onSearch(e.target.value);
      setDisplayClear(!displayClear);
    }
  };

  // handles reset search box button
  const handleClearSearch = () => {
    if (textValue) {
      // checks if there is any search value to clear
      setTextValue(""); // set search value to empty
      setDisplayClear(!displayClear); // removes clear button from the display
      props.onClear();
    }
  };

  // controls value of input tag and textValue
  const setValue = (e: any) => {
    setTextValue(e.target.value);
  };

  // search bar allows user to input string to search pokemon by
  return (
    <Flex
      borderRadius="30px"
      bgColor="background.900"
      display="flex"
      justify="center"
      alignItems="center"
      flex="2"
      title="container"
    >
      {displayClear ? (
        <Flex
          display="flex"
          alignItems="center"
          gap="5%"
          w="90%"
          justify="space-between"
          title="searchWithClearButton"
        >
          <Search2Icon color="background.200" fontSize="20px"></Search2Icon>
          <Input
            bgColor="background.900"
            color="white"
            maxH="100px"
            h="60px"
            w="75%"
            fontSize="50px"
            border="none"
            placeholder="Pokedéx"
            paddingRight="0px !important"
            paddingLeft="0px !important"
            _focus={{ border: "none" }}
            _placeholder={{
              color: "background.500",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "45px",
            }}
            value={textValue}
            onKeyUp={handleSearch}
            onChange={setValue}
            marginRight="0px"
            title="input"
          />
          <IconButton
            aria-label="Clear"
            icon={<CloseIcon fontSize="15x" />}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="background.200"
            borderRadius="50%"
            color="background.900"
            id="clearButton"
            type="reset"
            onClick={handleClearSearch}
            title="clearButton"
          >
            X
          </IconButton>
        </Flex>
      ) : (
        <Flex
          display="flex"
          alignItems="center"
          gap="5%"
          w="90%"
          justify="flex-start"
          title="searchWithoutClearButton"
        >
          <Search2Icon color="#cee4e1" fontSize="20px"></Search2Icon>
          <Input
            bgColor="background.900"
            display="flex"
            color="white"
            ml="18px"
            maxH="100px"
            h="60px"
            w="75%"
            fontSize="50px"
            border="none"
            _focus={{ border: "none" }}
            _placeholder={{
              color: "background.500",
              textAlign: "center",
              paddingLeft: "50px",
              fontWeight: "bold",
              fontSize: "45px",
            }}
            placeholder="Pokedéx"
            value={textValue}
            onKeyUp={handleSearch}
            onChange={setValue}
            marginRight="0px"
            title="input"
          />
        </Flex>
      )}
    </Flex>
  );
}
export default Search;
