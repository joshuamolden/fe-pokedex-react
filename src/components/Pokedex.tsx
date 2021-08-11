import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";
import Login from "./Login/Login";
import Register from "./Login/Register";
import CapturedPokemon from "./Login/CapturedPokemon";

const Pokedex = (): React.ReactElement => (
  <Routes>
    <Route path="/v1/pokemon/:pokemon_id" element={<PokemonDetails />} />
    <Route path="/pokedex/login" element={<Login />} />
    <Route path="/pokedex/register" element={<Register />} />
    <Route path="/pokedex/trainer" element={<CapturedPokemon />} />
    <Route path="/pokedex" element={<PokemonList />} />
  </Routes>
);
export default Pokedex;
