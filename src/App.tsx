import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Pokedex from "./components/Pokedex";

export const theme = extendTheme({
  colors: {
    background: {
      100: "#54A69C",
      200: "#CEE4E1",
      500: "#519f95",
      900: "#458780",
    },
    bug: {
      500: "#a8b720",
      200: "#edf1d6",
    },
    dark: {
      500: "#705846",
      200: "#e3deda",
    },
    dragon: {
      500: "#7137f8",
      200: "#e3d7ff",
    },
    electric: {
      500: "#f8ce30",
      200: "#fdf6da",
    },
    fairy: {
      500: "#dea4dd",
      200: "#f9ecf9",
    },
    fighting: {
      500: "#8f6760",
      200: "#e8e0df",
    },
    fire: {
      500: "#ef7f30",
      200: "#fde6d8",
    },
    flying: {
      500: "#a890ef",
      200: "#eee9fc",
    },
    ghost: {
      500: "#705798",
      200: "#e3deeb",
    },
    grass: {
      500: "#78c84f",
      200: "#e5f4dd",
    },
    ground: {
      500: "#e1bf68",
      200: "#f9f2e1",
    },
    ice: {
      500: "#99d7d7",
      200: "#eaf7f7",
    },
    normal: {
      500: "#a8a877",
      200: "#eeeee4",
    },
    psychic: {
      500: "#f85887",
      200: "#ffdfe7",
    },
    poison: {
      500: "#9f409f",
      200: "#edd9ec",
    },
    rock: {
      500: "#b89f37",
      200: "#f1ecd9",
    },
    steel: {
      500: "#b8b8d0",
      200: "#f1f1f5",
    },
    water: {
      500: "#6890f0",
      200: "#e0e9fd",
    },
  },
});

export default function App(): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Pokedex />
      </BrowserRouter>
    </ChakraProvider>
  );
}
