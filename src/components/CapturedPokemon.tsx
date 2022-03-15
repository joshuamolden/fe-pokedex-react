import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard/PokemonCard";
import Header from "./Header/Header";
import Search from "./Search/Search";
import PageButton from "./PageButton/PageButton";
import axios, { AxiosResponse } from "axios";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useSearch } from "../contexts/SearchContext";
import {
  ROUTING_DETAILS_PATH,
  ROUTING_LOGIN_PATH,
} from "../services/routingConstants";
import { API_POKEMON_PATH } from "../services/apiConstants";

const CapturedPokemon = (): ReactElement => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const { searchValue, pageInfo, setPageInfo } = useSearch();

  const jwt = window.localStorage.getItem("jwt");

  useEffect(() => {
    axios
      .get(
        `${API_POKEMON_PATH}/?name=${searchValue}&page=${pageInfo.currentPage}`,
        { headers: { jwt: jwt } }
      )
      .then((response: AxiosResponse<PaginatedPokemonList>) => {
        setPokemonList(response.data.content);
        setPageInfo({
          currentPage: response.data.number,
          maxPageNumber: response.data.totalPages - 1,
        });
      });
  }, [jwt, pageInfo.currentPage, searchValue, setPageInfo]);

  const deleteJwt = (): void => {
    window.localStorage.removeItem("jwt");
  };

  return (
    <Flex align="center" bgColor="background.500" h="100%" flexDir="column">
      {jwt ? (
        <Button alignSelf="flex-end" mt="20px" mr="50px">
          <Link onClick={deleteJwt} to={`${ROUTING_LOGIN_PATH}`}>
            Logout
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {pokemonList.length ? (
        <Box w="90%" mb="50px">
          <Header>
            <PageButton direction={true} />
            <Search />
            <PageButton direction={false} />
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
                to={`${ROUTING_DETAILS_PATH}/${pokemon.id}`}
                key={pokemon.id}
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
            Page {pageInfo.currentPage + 1}
          </Heading>
        </Box>
      ) : (
        <div>
          {jwt ? (
            <Box w="90%" mb="50px" h="100vh">
              <Header>
                <PageButton direction={true} />
                <Search />
                <PageButton direction={false} />
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
};
export default CapturedPokemon;
