import React, { useEffect, useState } from "react";
import "../pokemonTypes.css";
import { pokemonDetails } from "./Types";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Progress,
  Table,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { theme } from "../App";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { State } from "history";

// max stat value for each stat
const maxStat = 255;

// adds commas to egg groups and abilities returned by api data
const addComma = (array: string[]) => {
  const returnArray = [];
  // for loop adds commas to egg group strings if there are multiple egg groups
  for (let i = 0; i < array.length; i++) {
    // makes sure comma isn't added to the last one
    if (array.length - i === 1) {
      returnArray.push(array[i]);
    } else {
      returnArray.push(array[i] + ",");
    }
  }
  return returnArray;
};

const adjustStat = (value: number | undefined): number => {
  if (value) return (value / maxStat) * 100;
  else return 0;
};

function PokemonDetails(): React.ReactElement {
  // used to store information returned from api call made for a specific pokemon
  const [pokemonDetails, setPokemonDetails] = useState<pokemonDetails>();

  // this will grab the id in the url. Linked to first <Route> element in Pokedex.js
  const { pokemon_id } = useParams();

  const [types, setTypes] = useState<string[]>([]);

  // used to display commas after Egg Groups if there are multiple
  const [modEggGroups, setModEggGroups] = useState<string[]>([]);

  // used to display commas after Abilities if there are multiple
  const [modAbilities, setModAbilities] = useState<string[]>([]);

  // keeps track of color for different elements of DOM
  const [color, setColor] = useState<Record<number, string>>();

  // need to keep track of the type as a string because of how Chakra's colorScheme works
  const [type, setType] = useState<string>("");

  const { state } = useLocation();

  // api call used to retrieve specific pokemon data
  useEffect(() => {
    if (pokemon_id) {
      axios
        .get(`http://localhost:8080/api/v1/pokemon/${pokemon_id}`)
        .then(function (response: any) {
          setPokemonDetails(response.data);
          setColor(
            (theme.colors as unknown as Record<string, Record<number, string>>)[
              response.data.types[0]
            ]
          ); // state vaiable set to correct colors
          setType(response.data.types[0]);
          setTypes(response.data.types);
          setModEggGroups(addComma(response.data.egg_groups));
          setModAbilities(addComma(response.data.abilities));
        });
    }
  }, [pokemon_id]);

  // displays details about a specific pokemon
  return (
    <Container
      bgColor={color?.[500]}
      margin="0px"
      maxW="100%"
      padding="0px"
      h="150vh"
    >
      <Heading as="h1" display="flex" justifyContent="center" flexDir="row">
        <Flex flex="1" justifyContent="flex-end" mt="75px" mb="50px">
          <Flex flex="1" justifyContent="center" alignItems="center">
            <Link
              to={`/?search=${
                (state as { searchValue: string })?.searchValue
              }&page=${(state as { currentPage: number })?.currentPage}`}
            >
              <IconButton
                aria-label="Back"
                _focus={{}}
                _active={{
                  bg: "white",
                }}
                icon={
                  <ArrowBackIcon
                    fontSize="35px"
                    color={color?.[500]}
                    bgColor="white"
                    border="none"
                    borderRadius="50%"
                  />
                }
                bgColor="white"
                _hover={{ backgroundColor: "white" }}
                borderRadius="50%"
                h="50px"
                w="50px"
              ></IconButton>
            </Link>
          </Flex>
          <Flex
            flex="2"
            fontSize="50px"
            justifyContent="center"
            alignItems="center"
            color="white"
          >
            {pokemonDetails?.name}
          </Flex>
          <Box flex="1"></Box>
        </Flex>
      </Heading>
      <Box w="80%" bgColor="white" margin="auto" paddingBottom="50px">
        <Heading
          as="h4"
          padding="10px"
          fontSize="17px"
          textAlign="left"
          display="flex"
          alignItems="center"
          color="black"
        >
          <Flex marginLeft="15px">{pokemonDetails?.name}</Flex>
          <Flex color="#bababa" flex="2" ml="15px" mr="5px">
            #{pokemonDetails?.id}
          </Flex>
          <Flex flexDir="row" justifyContent="flex-end" alignContent="center">
            {types?.map((type: string) => (
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
                key={type}
              >
                {type.toUpperCase()}
              </Flex>
            ))}
          </Flex>
        </Heading>
        <Box as="hr" h="1px" color="#bababa"></Box>
        <Flex justifyContent="center" marginTop="15px" w="85%" margin="auto">
          <Image
            src={pokemonDetails?.image}
            alt={pokemonDetails?.name}
            float="left"
            h="250px"
          ></Image>
          <Table
            color="black"
            w="10%"
            fontWeight="bold"
            size="sm"
            variant="unstyled"
          >
            <Tr>
              <Td paddingTop="4px" paddingBottom="4px">
                HP
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                <Progress
                  w={maxStat}
                  colorScheme={type}
                  bg={color?.[200]}
                  h="25px"
                  borderRadius="6px"
                  value={adjustStat(pokemonDetails?.stats?.hp)}
                />
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                {pokemonDetails?.stats?.hp}
              </Td>
            </Tr>
            <Tr>
              <Td paddingTop="4px" paddingBottom="4px">
                Attack
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                <Progress
                  w={maxStat}
                  colorScheme={type}
                  bg={color?.[200]}
                  h="25px"
                  borderRadius="6px"
                  value={adjustStat(pokemonDetails?.stats?.attack)}
                />
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                {pokemonDetails?.stats?.attack}
              </Td>
            </Tr>
            <Tr>
              <Td paddingTop="4px" paddingBottom="4px">
                Defense
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                <Progress
                  w={maxStat}
                  colorScheme={type}
                  bg={color?.[200]}
                  h="25px"
                  borderRadius="6px"
                  value={adjustStat(pokemonDetails?.stats?.defense)}
                />
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                {pokemonDetails?.stats?.defense}
              </Td>
            </Tr>
            <Tr>
              <Td paddingTop="4px" paddingBottom="4px">
                Speed
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                <Progress
                  w={maxStat}
                  colorScheme={type}
                  bg={color?.[200]}
                  h="25px"
                  borderRadius="6px"
                  value={adjustStat(pokemonDetails?.stats?.speed)}
                />
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                {pokemonDetails?.stats?.speed}
              </Td>
            </Tr>
            <Tr>
              <Td paddingTop="4px" paddingBottom="4px">
                Sp Atk
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                <Progress
                  w={maxStat}
                  colorScheme={type}
                  bg={color?.[200]}
                  h="25px"
                  borderRadius="6px"
                  value={adjustStat(pokemonDetails?.stats?.["special-attack"])}
                />
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                {pokemonDetails?.stats?.["special-attack"]}
              </Td>
            </Tr>
            <Tr>
              <Td paddingTop="4px" paddingBottom="4px">
                Sp Def
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                <Progress
                  w={maxStat}
                  colorScheme={type}
                  bg={color?.[200]}
                  h="25px"
                  borderRadius="6px"
                  value={adjustStat(pokemonDetails?.stats?.["special-defense"])}
                />
              </Td>
              <Td paddingTop="4px" paddingBottom="4px">
                {pokemonDetails?.stats?.["special-defense"]}
              </Td>
            </Tr>
          </Table>
        </Flex>
        <Box w="85%" margin="auto">
          <Heading as="h4" fontSize="19px" mb="15px">
            {pokemonDetails?.genus}
          </Heading>
          <Text fontSize="16px" mb="15px">
            {pokemonDetails?.description}
          </Text>
          <Heading
            as="h3"
            fontSize="17px"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            padding="5px"
            paddingLeft="20px"
            mb="20px"
            bgColor={color?.[500]}
            color="white"
          >
            Profile
          </Heading>
          <Table
            color="black"
            w="100%"
            fontWeight="bold"
            size="sm"
            variant="unstyled"
            display="flex"
            gridGap="20px"
            flexDir="column"
          >
            <Tr display="flex">
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="bold"
              >
                Height:
              </Td>
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="normal"
              >
                {pokemonDetails?.height} m
              </Td>
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="bold"
              >
                Weight:
              </Td>
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="normal"
              >
                {pokemonDetails?.weight} kg
              </Td>
            </Tr>
            <Tr display="flex">
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="bold"
              >
                Egg Groups:
              </Td>
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="normal"
              >
                {modEggGroups.map((egg_group: string) => (
                  <Flex key={egg_group}>{egg_group}</Flex>
                ))}
              </Td>
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="bold"
              >
                Abilities:
              </Td>
              <Td
                fontSize="17px"
                justifyContent="left"
                flex="1"
                fontWeight="normal"
              >
                {modAbilities.map((ability: string) => (
                  <Flex key={ability}>{ability}</Flex>
                ))}
              </Td>
            </Tr>
          </Table>
        </Box>
      </Box>
    </Container>
  );
}
export default PokemonDetails;
