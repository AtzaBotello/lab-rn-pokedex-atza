/* eslint-disable react/react-in-jsx-scope */
import {GetPokemon, Pokemon, reducerTypes} from '../../types/types';
import {PokemonContext} from './PokemonContext';
import {pokemonReducer} from './pokemonReducer';
import {ReactNode, useReducer} from 'react';

type ChildrenComponent = {
  children: ReactNode;
};

export const PokemonProvider = ({children}: ChildrenComponent) => {
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemons: [],
    lastPokemon: null,
    caughtPokemon: [],
    isLoading: true,
  });

  const setPokedex = (pokemons: GetPokemon[]) => {
    const action = {
      type: reducerTypes.ALL,
      payload: {pokemons},
    };
    dispatch(action);
  };

  const addToTeam = ({id, name, type, abilities}: Pokemon) => {
    const newPokemon = {
      id,
      name,
      type,
      abilities,
    };
    const action = {
      type: reducerTypes.ADD,
      payload: {pokemon: newPokemon},
    };

    dispatch(action);
  };

  const seeItPokemon = ({id, name, type, abilities}: Pokemon) => {
    const newPokemon = {
      id,
      name,
      type,
      abilities,
    };
    const action = {
      type: reducerTypes.REGISTER,
      payload: {pokemon: newPokemon},
    };

    dispatch(action);
  };

  const setShow = (isLoading: boolean) => {
    const action = {
      type: reducerTypes.SHOW,
      payload: {show: isLoading},
    };

    dispatch(action);
  };

  return (
    <PokemonContext.Provider
      value={{state, setPokedex, addToTeam, seeItPokemon, setShow}}>
      {children}
    </PokemonContext.Provider>
  );
};
