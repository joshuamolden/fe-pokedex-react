export const pokemonListMock: PaginatedPokemonList = {
  content: [
    {
      id: 1,
      name: "Bulbasaur",
      types: ["poison", "grass"],
    },
    {
      id: 2,
      name: "Ivysaur",
      types: ["poison", "grass"],
    },
    {
      id: 3,
      name: "Venusaur",
      types: ["poison", "grass"],
    },
    {
      id: 4,
      name: "Charmander",
      types: ["fire"],
    },
    {
      id: 5,
      name: "Charmeleon",
      types: ["fire"],
    },
    {
      id: 6,
      name: "Charizard",
      types: ["fire", "flying"],
    },
    {
      id: 7,
      name: "Squirtle",
      types: ["water"],
    },
    {
      id: 8,
      name: "Wartortle",
      types: ["water"],
    },
    {
      id: 9,
      name: "Blastoise",
      types: ["water"],
    },
    {
      id: 10,
      name: "Caterpie",
      types: ["bug"],
    },
    {
      id: 11,
      name: "Metapod",
      types: ["bug"],
    },
    {
      id: 12,
      name: "Butterfree",
      types: ["flying", "bug"],
    },
    {
      id: 13,
      name: "Weedle",
      types: ["poison", "bug"],
    },
    {
      id: 14,
      name: "Kakuna",
      types: ["poison", "bug"],
    },
    {
      id: 15,
      name: "Beedrill",
      types: ["poison", "bug"],
    },
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 15,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalPages: 37,
  totalElements: 553,
  size: 15,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 15,
  first: true,
  empty: false,
};

export const pokemonDetailsMock: PokemonDetails = {
  id: 1,
  name: "Bulbasaur",
  types: ["poison", "grass"],
  height: 7.0,
  weight: 69.0,
  abilities: ["chlorophyll", "overgrow"],
  egg_groups: ["plant", "monster"],
  stats: {
    hp: 45,
    speed: 45,
    attack: 49,
    defense: 49,
    "special-attack": 65,
    "special-defense": 65,
  },
  genus: "Seed Pokémon",
  description:
    "Bulbasaur can be seen napping in bright sunlight.\nThere is a seed on its back. By soaking up the sun’s rays,\nthe seed grows progressively larger.",
};
