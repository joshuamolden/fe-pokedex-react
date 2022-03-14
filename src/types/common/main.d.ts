type Url = { prev: string | null; next: string | null };

type Pokemon = {
  id: number;
  name: string;
  image?: string | undefined;
  types: string[];
};

type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  "special-attack": number;
  "special-defense": number;
};

type PokemonDetails = {
  id: number;
  name: string;
  types: string[];
  image?: string | undefined;
  stats: Pokemonstats;
  egg_groups: string[];
  abilities: string[];
  genus: string;
  description: string;
  height: number;
  weight: number;
};

type DisplayButton = {
  direction: string;
  displayButton: string | null | undefined;
  onClick: () => void;
};

type Pageable = {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

type SortSearch = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type PaginatedPokemonList = {
  content: Pokemon[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: SortSearch;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
