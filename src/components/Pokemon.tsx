import React from "react";
import "../pokemonTypes.css";
import { Image, Box, Flex, Text } from "@chakra-ui/react";
import { pokemonType } from "./PokemonList";

type pokemon = {
  pokemon: {
    name: string;
    image: string | undefined;
    types: pokemonType[];
  };
};

const Pokemon = (props: pokemon): React.ReactElement => (
  <Flex
    w="350px"
    h="400px"
    flexDir="column"
    m="0 auto"
    borderRadius=".2em"
    bgColor="white"
  >
    <Text
      color="black"
      justifyContent="center"
      m="20px"
      fontSize="20px"
      fontWeight="bold"
    >
      {props.pokemon.name}
    </Text>
    <Box as="hr" h="1px" color="#bababa"></Box>
    <Image
      src={props.pokemon.image}
      alt={props.pokemon.name}
      display="flex"
      w="250px"
      h="250px"
      m="auto"
    />
    <Flex flexDir="row" justifyContent="flex-end" m="5px" mr="10px" p="10px">
      {props.pokemon.types?.map((type) => (
        <Flex
          display="flex"
          fontSize="15px"
          mr="10px"
          borderStyle="solid"
          borderRadius="8px"
          paddingLeft="7px"
          paddingRight="7px"
          paddingTop="2px"
          paddingBottom="2px"
          className={type.toString()}
          key={type.toString()}
        >
          {String(type).toUpperCase()}
        </Flex>
      ))}
    </Flex>
  </Flex>
);
export default Pokemon;
