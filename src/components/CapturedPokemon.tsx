import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard/PokemonCard";
import Header from "./Header/Header";
import Search from "./Search/Search";
import PageButton from "./PageButton/PageButton";
import axios from "axios";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

function createLinks(
  searchValue: string,
  pageNumber: number,
  totalPages: number
): Url {
  if (pageNumber === 0 && totalPages === 1) {
    return {
      prev: null,
      next: null,
    };
  } else if (pageNumber === 0) {
    return {
      prev: null,
      next: `http://localhost:8080/api/v1/trainer/captured?name=${searchValue}&page=${
        pageNumber + 1
      }`,
    };
  } else if (pageNumber === totalPages - 1) {
    // pages start from 0, so the last page is actually the (total pages - 1)
    return {
      prev: `http://localhost:8080/api/v1/trainer/captured?name=${searchValue}&page=${
        pageNumber - 1
      }`,
      next: null,
    };
  } else {
    return {
      prev: `http://localhost:8080/api/v1/trainer/captured?name=${searchValue}&page=${
        pageNumber - 1
      }`,
      next: `http://localhost:8080/api/v1/trainer/captured?name=${searchValue}&page=${
        pageNumber + 1
      }`,
    };
  }
}

function CapturedPokemon(): React.ReactElement {
  // used to update url when new search criterion is inputed or user pages through results
  const push = useNavigate();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [links, setLinks] = useState<Url>();
  // stores the current page number. Needs to be track separately in order to work properly
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  // returns information concerning search and page in url
  const { search } = useLocation();

  const jwt = window.localStorage.getItem("jwt");

  const apiCall = useCallback(
    (search_value, page_number) => {
      const queryString = new URLSearchParams(search); // breaks query information into key: value pairs
      queryString.set("name", search_value);
      queryString.set("page", page_number);
      push(`/pokedex/trainer?${queryString.toString()}`);
      axios
        .get(
          `http://localhost:8080/api/v1/trainer/captured?jwt=${jwt}&name=${search_value}&page=${page_number}`,
          { headers: { jwt: jwt } }
        )
        .then(function (response: any) {
          setPokemonList(response.data.content);
          const array = createLinks(
            search_value,
            response.data.number,
            response.data.totalPages
          );
          setLinks(array);
          setCurrentPage(response.data.number);
          setLastPage(response.data.totalPages - 1); // pages start from 0, so the last page is actually the (total pages - 1)
        });
    },
    [jwt, push, search]
  );

  useEffect(() => {
    const queryString = new URLSearchParams(search); // breaks query information into key: value pairs
    const searchParam = queryString.get("name");
    const pageParam = queryString.get("page");
    if (pageParam === "null" && searchParam === "null") {
      apiCall("", 0);
    } else if (pageParam === null && searchParam === null) {
      apiCall("", 0);
    } else if (Number(pageParam) > lastPage || Number(pageParam) < 0) {
      // deals with invalid page numbers entered into url
      alert("Invalid page number. Redirected to page 1.");
      apiCall(searchParam, 0); // will redirect user to page one of current search value
    } else {
      setSearchValue(
        searchParam === null || searchParam === "undefined" ? "" : searchParam
      );
      apiCall(searchParam, pageParam); // makes api call based on searchParam
    }
  }, []);

  const handlePageChange = (
    direction: boolean,
    link: string | null | undefined
  ): void => {
    const pageNum = parseInt(String(link).split("=")[2]); // grabs page number from prev url link
    if (direction) {
      if (link) {
        apiCall(searchValue, pageNum);
      } else {
        console.log("No 'prev' link");
      }
    } else {
      if (link) {
        apiCall(searchValue, pageNum);
      } else {
        console.log("No 'next' link");
      }
    }
  };

  const deleteJwt = (): void => {
    window.localStorage.removeItem("jwt");
  };

  return (
    <Flex align="center" bgColor="background.500" h="100%" flexDir="column">
      {jwt ? (
        <Button alignSelf="flex-end" mt="20px" mr="50px">
          <Link onClick={deleteJwt} to={"/pokedex/login"}>
            Logout
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {pokemonList.length ? (
        <Box w="90%" mb="50px">
          <Header>
            <PageButton
              direction={"left"}
              displayButton={links?.prev}
              onClick={() => {
                handlePageChange(true, links?.prev);
              }}
            />
            <Search
              onSearch={(search: string) => {
                apiCall(search, 0);
              }}
              onClear={() => {
                apiCall("", 0);
              }}
            />
            <PageButton
              direction={"right"}
              displayButton={links?.next}
              onClick={() => {
                handlePageChange(false, links?.next);
              }}
            />
          </Header>
          <Flex
            flexDir="row"
            flexWrap="wrap"
            gridGap="30px"
            margin="auto"
            justify="center"
          >
            {pokemonList?.map((pokemon: Pokemon) => (
              <Link
                to={`/v1/pokemon/${pokemon.id}${search}`}
                key={pokemon.id}
                state={{ searchValue, currentPage }}
              >
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </Flex>
          <Heading
            as="h3"
            mb="40px"
            mt="40px"
            color="white"
            display="flex"
            justifyContent="center"
            fontSize="50px"
          >
            Page {currentPage + 1}
          </Heading>
        </Box>
      ) : (
        <div>
          {jwt ? (
            <Box w="90%" mb="50px" h="100vh">
              <Header>
                <PageButton
                  direction={"left"}
                  displayButton={links?.prev}
                  onClick={() => {
                    handlePageChange(true, links?.prev);
                  }}
                />
                <Search
                  onSearch={(search: string) => {
                    apiCall(search, 0);
                  }}
                  onClear={() => {
                    apiCall("", 0);
                  }}
                />
                <PageButton
                  direction={"right"}
                  displayButton={links?.next}
                  onClick={() => {
                    handlePageChange(false, links?.next);
                  }}
                />
              </Header>
              <Heading as="h1" textAlign="center" margin="10px" color="white">
                No pokemon fit search criterion.
              </Heading>
            </Box>
          ) : (
            <Flex
              h="100vh"
              align="center"
              color="white"
              fontSize="50px"
              fontWeight="bold"
            >
              You are not logged in!
            </Flex>
          )}
        </div>
      )}
    </Flex>
  );
}
export default CapturedPokemon;
