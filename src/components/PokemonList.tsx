import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard/PokemonCard";
import Header from "./Header/Header";
import Search from "./Search/Search";
import PageButton from "./PageButton/PageButton";
import axios, { AxiosResponse } from "axios";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useSearch } from "../contexts/SearchContext";
import { ROUTING_DETAILS_PATH } from "../services/routingConstants";
import { API_POKEMON_PATH } from "../services/apiConstants";

const ListPokemon = (): ReactElement => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const { searchValue, pageInfo, setPageInfo } = useSearch();

  useEffect(() => {
    axios
      .get(
        `${API_POKEMON_PATH}/?name=${searchValue}&page=${pageInfo.currentPage}`
      )
      .then((response: AxiosResponse<PaginatedPokemonList>) => {
        setPokemonList(response.data.content);
        setPageInfo({
          currentPage: response.data.number,
          maxPageNumber: response.data.totalPages - 1,
        });
      });
  }, [pageInfo.currentPage, searchValue, setPageInfo]);

  return (
    <Flex justify="center" bgColor="background.500" h="100%">
      {pokemonList.length ? (
        <Box w="90%" mt="50px" mb="50px">
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
        <Box w="90%" mt="50px" mb="50px" h="100vh">
          <Header>
            <PageButton direction={true} />
            <Search />
            <PageButton direction={false} />
          </Header>
          <Heading as="h1" textAlign="center" margin="10px" color="white">
            No pokemon fit search criterion.
          </Heading>
        </Box>
      )}
    </Flex>
  );
};
export default ListPokemon;
