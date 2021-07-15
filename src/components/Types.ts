export type url = { prev: string | null; next: string | null };

export type pokemon = {
  id: number;
  name: string;
  image: string;
  types: pokemonType[];
};

export type stats = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  "special-attack": number;
  "special-defense": number;
};

export type pokemonType = { name: string };

type pokemonAbility = { name: string };

type pokemonEggGroup = { name: string };

export type pokemonDetails = {
  id: number;
  name: string;
  types: pokemonType[];
  image: string | undefined;
  stats: stats;
  egg_groups: pokemonEggGroup[];
  abilities: pokemonAbility[];
  genus: string;
  description: string;
  height: number;
  weight: number;
};

export type fromParent = {
  direction: string | null;
  displayButton: string | null | undefined;
  onClick: any;
};
