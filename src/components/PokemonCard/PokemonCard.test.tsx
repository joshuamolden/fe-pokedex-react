/* eslint-disable @typescript-eslint/no-empty-function */
import PokemonCard from "./PokemonCard";
import { render } from "@testing-library/react";
import React from "react";
import { pokemonListMock } from "../../__fixtures__/pokemon";

it("render pokemon", () => {
  const { queryByTitle, queryByText } = render(
    <PokemonCard pokemon={pokemonListMock.content[0]} />
  );

  const container = queryByTitle("container");
  const name = queryByText("Bulbasaur");
  const hr = queryByTitle("hr");
  const image = queryByTitle("image");
  const types = queryByTitle("types");
  const poison = queryByText("POISON");
  const grass = queryByText("GRASS");

  expect(container).toBeTruthy();
  expect(name).toBeTruthy();
  expect(hr).toBeTruthy();
  expect(image).toBeTruthy();
  expect(types).toBeTruthy();
  expect(poison).toBeTruthy();
  expect(grass).toBeTruthy();
});

describe("Pokemon.tsx", () => {
  it("render pokemon", () => {
    const { asFragment } = render(
      <PokemonCard pokemon={pokemonListMock.content[0]} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
