import React, { ReactElement } from "react";
import "../../pokemonTypes.css";
import { Image, Box, Flex, Text } from "@chakra-ui/react";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }): ReactElement => (
  <Flex
    w="350px"
    h="400px"
    flexDir="column"
    m="0 auto"
    borderRadius=".2em"
    bgColor="white"
    title="container"
  >
    <Text
      color="black"
      justifyContent="center"
      m="20px"
      fontSize="20px"
      fontWeight="bold"
      title="name"
    >
      {pokemon.name}
    </Text>
    <Box as="hr" h="1px" color="#bababa" title="hr"></Box>
    <Image
      src={`pokemon_imgs/${pokemon.id}.png`}
      alt={pokemon.name}
      display="flex"
      w="250px"
      h="250px"
      m="auto"
      title="image"
    />
    <Flex
      flexDir="row"
      justifyContent="flex-end"
      m="5px"
      mr="10px"
      p="10px"
      title="types"
    >
      {pokemon.types?.map((type, index) => (
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
          className={type}
          key={index}
        >
          {type.toUpperCase()}
        </Flex>
      ))}
    </Flex>
  </Flex>
);
export default PokemonCard;
