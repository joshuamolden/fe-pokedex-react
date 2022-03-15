import React, { ReactElement, useEffect, useState } from "react";
import "../pokemonTypes.css";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { theme } from "../App";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ROUTING_BASE_PATH } from "../services/routingConstants";
import { addComma, adjustStat } from "../utils/utils";
import { API_POKEMON_PATH } from "../services/apiConstants";

const MAX_STAT_VALUE = 255;

function PokemonDetails(): ReactElement {
  // Grabs params in URL. Linked to first <Route> element in Pokedex.js
  const { pokemon_id } = useParams();

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const [types, setTypes] = useState<string[]>([]);
  const [commaSeparatedAttributes, setCommaSeparatedAttributes] =
    useState<CommaSeparated>({
      eggGroups: [],
      abilities: [],
    });

  // keeps track of color for different elements of DOM
  const [color, setColor] = useState<Record<number, string>>();

  // need to keep track of the type as a string because of how Chakra's colorScheme works
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (pokemon_id) {
      axios
        .get(`${API_POKEMON_PATH}/${pokemon_id}`)
        .then((response: AxiosResponse<PokemonDetails>) => {
          setPokemonDetails(response.data);
          setColor(
            (theme.colors as unknown as Record<string, Record<number, string>>)[
              response.data.types[0]
            ]
          );
          setType(response.data.types[0]);
          setTypes(response.data.types);
          setCommaSeparatedAttributes({
            eggGroups: addComma(response.data.egg_groups),
            abilities: addComma(response.data.abilities),
          });
        });
    }
  }, [pokemon_id]);

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
            <Link to={`${ROUTING_BASE_PATH}`}>
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
            src={`/pokemon_imgs/${pokemon_id}.png`}
            alt={pokemonDetails?.name}
            float="left"
            h="250px"
          />
          <Table
            color="black"
            w="10%"
            fontWeight="bold"
            size="sm"
            variant="unstyled"
          >
            <Tbody>
              <Tr>
                <Td paddingTop="4px" paddingBottom="4px">
                  HP
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  <Progress
                    w={MAX_STAT_VALUE}
                    colorScheme={type}
                    bg={color?.[200]}
                    h="25px"
                    borderRadius="6px"
                    value={adjustStat(pokemonDetails?.stats.hp, MAX_STAT_VALUE)}
                  />
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  {pokemonDetails?.stats.hp}
                </Td>
              </Tr>
              <Tr>
                <Td paddingTop="4px" paddingBottom="4px">
                  Attack
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  <Progress
                    w={MAX_STAT_VALUE}
                    colorScheme={type}
                    bg={color?.[200]}
                    h="25px"
                    borderRadius="6px"
                    value={adjustStat(
                      pokemonDetails?.stats.attack,
                      MAX_STAT_VALUE
                    )}
                  />
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  {pokemonDetails?.stats.attack}
                </Td>
              </Tr>
              <Tr>
                <Td paddingTop="4px" paddingBottom="4px">
                  Defense
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  <Progress
                    w={MAX_STAT_VALUE}
                    colorScheme={type}
                    bg={color?.[200]}
                    h="25px"
                    borderRadius="6px"
                    value={adjustStat(
                      pokemonDetails?.stats.defense,
                      MAX_STAT_VALUE
                    )}
                  />
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  {pokemonDetails?.stats.defense}
                </Td>
              </Tr>
              <Tr>
                <Td paddingTop="4px" paddingBottom="4px">
                  Speed
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  <Progress
                    w={MAX_STAT_VALUE}
                    colorScheme={type}
                    bg={color?.[200]}
                    h="25px"
                    borderRadius="6px"
                    value={adjustStat(
                      pokemonDetails?.stats.speed,
                      MAX_STAT_VALUE
                    )}
                  />
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  {pokemonDetails?.stats.speed}
                </Td>
              </Tr>
              <Tr>
                <Td paddingTop="4px" paddingBottom="4px">
                  Sp Atk
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  <Progress
                    w={MAX_STAT_VALUE}
                    colorScheme={type}
                    bg={color?.[200]}
                    h="25px"
                    borderRadius="6px"
                    value={adjustStat(
                      pokemonDetails?.stats["special-attack"],
                      MAX_STAT_VALUE
                    )}
                  />
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  {pokemonDetails?.stats["special-attack"]}
                </Td>
              </Tr>
              <Tr>
                <Td paddingTop="4px" paddingBottom="4px">
                  Sp Def
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  <Progress
                    w={MAX_STAT_VALUE}
                    colorScheme={type}
                    bg={color?.[200]}
                    h="25px"
                    borderRadius="6px"
                    value={adjustStat(
                      pokemonDetails?.stats["special-defense"],
                      MAX_STAT_VALUE
                    )}
                  />
                </Td>
                <Td paddingTop="4px" paddingBottom="4px">
                  {pokemonDetails?.stats["special-defense"]}
                </Td>
              </Tr>
            </Tbody>
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
            <Tbody>
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
                  {commaSeparatedAttributes.eggGroups.map(
                    (egg_group: string) => (
                      <Flex key={egg_group}>{egg_group}</Flex>
                    )
                  )}
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
                  {commaSeparatedAttributes.abilities.map((ability: string) => (
                    <Flex key={ability}>{ability}</Flex>
                  ))}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
}
export default PokemonDetails;
