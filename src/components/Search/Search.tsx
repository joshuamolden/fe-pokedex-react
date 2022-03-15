import {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
} from "react";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useSearch } from "../../contexts/SearchContext";

const Search = (): ReactElement => {
  const [inputText, setInputText] = useState<string>("");
  const [displayClear, setDisplayClear] = useState<boolean>(false);

  const { searchValue, pageInfo, setSearchValue, setPageInfo } = useSearch();

  useEffect(() => {
    if (searchValue) {
      setDisplayClear(true);
    }
    setInputText(searchValue ?? "");
  }, [searchValue]);

  const handleSearch = (keyEvent: KeyboardEvent<HTMLInputElement>) => {
    if (keyEvent.key === "Enter") {
      setSearchValue(keyEvent.currentTarget.value);
      setDisplayClear(!displayClear);
      setPageInfo({ currentPage: 0, maxPageNumber: pageInfo.maxPageNumber });
    }
  };

  const handleClearSearch = () => {
    if (inputText) {
      setInputText("");
      setDisplayClear(!displayClear);
      setSearchValue("");
      setPageInfo({ currentPage: 0, maxPageNumber: pageInfo.maxPageNumber });
    }
  };

  const updateTextValue = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setInputText(changeEvent.target.value);
  };

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
            value={inputText}
            onKeyUp={handleSearch}
            onChange={updateTextValue}
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
            value={inputText}
            onKeyUp={handleSearch}
            onChange={updateTextValue}
            marginRight="0px"
            title="input"
          />
        </Flex>
      )}
    </Flex>
  );
};
export default Search;
