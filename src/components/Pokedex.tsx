import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";

const Pokedex = (): React.ReactElement => (
  <Routes>
    <Route path="v1/pokemon/:pokemon_id" element={<PokemonDetails />} />
    <Route path="/" element={<PokemonList />} />
  </Routes>
);
export default Pokedex;
