import {createContext} from 'react';
import {PokemonContextValue} from '../../types/types';

export const initialValue: PokemonContextValue = {
  state: {
    pokemons: [],
    lastPokemon: null,
    caughtPokemon: [],
    isLoading: false,
  },
  setPokedex: () => {},
  addToTeam: () => {},
  seeItPokemon: () => {},
  setShow: () => {},
};

export const PokemonContext = createContext<PokemonContextValue>(initialValue);
