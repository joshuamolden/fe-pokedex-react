/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pokemon from "./Pokemon";
import Header from "./Header";
import Search from "./Search";
import PageButton from "./PageButton";
import { url, pokemon } from "./Types";
import axios from "axios";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

function createLinks(
  searchValue: string,
  pageNumber: number,
  totalPages: number
): url {
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

  // used to return the list of pokemon displayed on each page. 15 pokemon per page
  const [pokemonList, setPokemonList] = useState([]);

  // used to keep track of links in order to take care of paging through results
  const [links, setLinks] = useState<url>();

  // stores the current page number. Needs to be track separately in order to work properly
  const [currentPage, setCurrentPage] = useState(0);

  // keeps track of the last page of results. Initially set to 37 because the first set of results has 37 pages
  // this needs to be track separately in order for functionality to work properly
  const [lastPage, setLastPage] = useState(36);

  // used for searching based on string inputed by user
  const [searchValue, setSearchValue] = useState("");

  // returns information concerning search and page in url
  const { search } = useLocation();

  const jwt = window.localStorage.getItem("jwt");

  // api call used to return pokemon based on a inputed search value and a page number.
  // Updates after enter is pushed to capture user input in search bar or when paging through results
  const apiCall = useCallback((search_value, page_number) => {
    const queryString = new URLSearchParams(search); // breaks query information into key: value pairs
    queryString.set("name", search_value); // sets search param to search_value
    queryString.set("page", page_number); // sets page param to page_number
    push(`/pokedex/trainer?${queryString.toString()}`); // updates url with new search_value and page_number
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
  }, []);

  // Makes initial api call and and new api call when user presses enter
  useEffect(() => {
    const queryString = new URLSearchParams(search); // breaks query information into key: value pairs
    const searchParam = queryString.get("name"); // gets the search value from url
    const pageParam = queryString.get("page"); // gets page value from url
    if (pageParam === "null" && searchParam === "null") {
      apiCall("", 0);
    } else if (pageParam === null && searchParam === null) {
      apiCall("", 0);
    } else {
      apiCall(searchParam, pageParam); // makes api call based on searchParam
    }
  }, []);

  // takes care of paging through results
  const handlePageChange = (
    direction: boolean,
    link: string | null | undefined
  ): void => {
    const pageNum = parseInt(String(link).split("=")[2]); // grabs page number from prev url link
    if (direction) {
      if (link) {
        // make sure prev link is not null (takes care of page left)
        apiCall(searchValue, pageNum);
      } else {
        console.log("No 'prev' link"); // at the beginning of the paginated results
      }
    } else {
      if (link) {
        // make sure next link is not null (takes care of page right)
        apiCall(searchValue, pageNum);
      } else {
        console.log("No 'next' link"); // at the end of the paginated results
      }
    }
  };

  const deleteJwt = (): void => {
    window.localStorage.removeItem("jwt");
  };

  // used to render the list of pokemon and the header when on Pokedex.js
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
      {pokemonList.length ? ( // displays results if any, or else notifies user there were not results based on search criterion or due to error
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
            {pokemonList?.map((pokemon: pokemon) => (
              <Link
                to={`/v1/pokemon/${pokemon.id}${search}`}
                key={pokemon.id}
                state={{ searchValue, currentPage }}
              >
                <Pokemon pokemon={pokemon} />
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
