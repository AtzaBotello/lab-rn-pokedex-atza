import {useState, useEffect, useContext} from 'react';
import {GetPokemon} from '../../types/types';
import {PokemonContext} from '../context/PokemonContext';

export const useFecth = (url: string) => {
  // const {setPokedex, setShow} = useContext(PokemonContext);
  const [state, setState] = useState({
    data: [] as GetPokemon[],
    isLoading: true,
    hasError: false,
  });

  const getFetch = async (url: string) => {
    setState({
      ...state,
      isLoading: true,
      hasError: false,
    });

    const resp = await fetch(url);
    const data = await resp.json();

    setState({
      data: data.results,
      isLoading: false,
      hasError: false,
    });

    console.log("finish the fetch request");
  };

  useEffect(() => {
    getFetch(url);
  }, [url]);

  return {
    ...state,
    getFetch,
  };
};
