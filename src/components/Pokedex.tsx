import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";

const Pokedex = (): React.ReactElement => (
  <Routes>
    <Route path="v1/pokemon/:pokemon_id" element={<PokemonDetails />} />
  </Routes>
);
export default Pokedex;
