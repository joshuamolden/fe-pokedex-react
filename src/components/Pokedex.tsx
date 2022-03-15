import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";
import Login from "./Login/Login";
import Register from "./Login/Register";
import CapturedPokemon from "./CapturedPokemon";
import SearchContextProvider from "../contexts/SearchContext";
import {
  ROUTING_BASE_PATH,
  ROUTING_DETAILS_PATH,
  ROUTING_LOGIN_PATH,
  ROUTING_REGISTER_PATH,
  ROUTING_TRAINER_PATH,
} from "../services/routingConstants";

const Pokedex = (): ReactElement => (
  <Routes>
    <Route
      path={`${ROUTING_DETAILS_PATH}/:pokemon_id`}
      element={
        <SearchContextProvider>
          <PokemonDetails />
        </SearchContextProvider>
      }
    />
    <Route path={`${ROUTING_LOGIN_PATH}`} element={<Login />} />
    <Route path={`#${ROUTING_REGISTER_PATH}`} element={<Register />} />
    <Route
      path={`${ROUTING_TRAINER_PATH}`}
      element={
        <SearchContextProvider>
          <CapturedPokemon />
        </SearchContextProvider>
      }
    />
    <Route
      path={`${ROUTING_BASE_PATH}`}
      element={
        <SearchContextProvider>
          <PokemonList />
        </SearchContextProvider>
      }
    />
  </Routes>
);
export default Pokedex;
