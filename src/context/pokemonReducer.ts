import {reducerTypes, PokemonState, ActionType} from '../../types/types';

export const pokemonReducer = (
  state: PokemonState,
  action: ActionType,
): PokemonState => {
  switch (action.type) {
    case reducerTypes.ALL:
      return {
        ...state,
        pokemons: [...action.payload.pokemons],
      };
    case reducerTypes.ADD:
      return {
        ...state,
        lastPokemon: action.payload.pokemon,
      };
    case reducerTypes.REGISTER:
      return {
        ...state,
        caughtPokemon: [...state.caughtPokemon, action.payload.pokemon],
      };
    case reducerTypes.SHOW:
      return {
        ...state,
        isLoadingCtx: action.payload.show,
      };
    default:
      return state;
  }
};
