/* eslint-disable @typescript-eslint/no-empty-function */
import Pokemon from "../Pokemon/Pokemon";
import { render } from "@testing-library/react";
import React from "react";

it("render pokemon", () => {
  const { queryByTitle, queryByText } = render(
    <Pokemon
      pokemon={{
        id: 1,
        name: "Bulbasaur",
        image: "https://intern-pokedex.myriadapps.com/images/pokemon/1.png",
        types: [{ name: "poison" }, { name: "grass" }],
      }}
    />
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
      <Pokemon
        pokemon={{
          id: 1,
          name: "Bulbasaur",
          image: "https://intern-pokedex.myriadapps.com/images/pokemon/1.png",
          types: [{ name: "poison" }, { name: "grass" }],
        }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
