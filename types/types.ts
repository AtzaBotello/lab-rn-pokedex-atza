export type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  Add: undefined;
};

// Context types

export type PokemonContextValue = {
  state: PokemonState;
  setPokedex: (pokemons: GetPokemon[]) => void;
  addToTeam: (pokemon: Pokemon) => void;
  seeItPokemon: (pokemon: Pokemon) => void;
  setShow: (show: boolean) => void;
};

export const reducerTypes = {
  ALL: '[All] Pokemon from Pokedex',
  REGISTER: '[Register] Pokemon to Pokedex',
  ADD: '[Caught] Pokemon to Team',
  REMOVE: '[Free] Pokemon',
  SHOW: '[Show] Pokemons',
};

export type PokemonState = {
  pokemons: GetPokemon[];
  lastPokemon: Pokemon | null;
  caughtPokemon: Pokemon[];
  isLoadingCtx: boolean;
};

type GetAllType = {type: string; payload: {pokemons: GetPokemon[]}};
type GetUniqueType = {type: string; payload: {pokemon: Pokemon}};
type ShowType = {type: string; payload: {show: boolean}};

export type ActionType = GetAllType | GetUniqueType | ShowType;

export type Pokemon = {
  id: number;
  name: string;
  type: string;
  abilities: string;
  sprites?: Sprites;
};

export type GetPokemon = {
  name: string;
  url: string;
  image?: string;
};

export type Sprites = {
  front_default: string;
  other?: {
    official_artwork: string;
  };
};

export const pokemonTypes = {
  normal: '#B5B9C4',
  fighting: '#EB4971',
  flying: '#58ABF6',
  poison: '#9F6E97',
  ground: '#F78551',
  rock: '#cebdab',
  bug: '#8BD674',
  ghost: '##58ABF6',
  steel: '#c9c9c9',
  fire: '#FFA756',
  water: '#58ABF6',
  grass: '#8BBE8A',
  electric: '#F2CB55',
  psychic: '#a754dd',
  ice: '#58ABF6',
  dragon: '#2628ba',
  fairy: '#EBA8C3',
};
