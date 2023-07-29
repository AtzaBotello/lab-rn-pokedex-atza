/* eslint-disable react/react-in-jsx-scope */
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {GetPokemon} from '../../types/types';
import {PokemonCard} from './PokemonCard';
import {HomeScreenNavigationProps} from '../screens';
import {useState, useEffect} from 'react';

interface PokemonListProps {
  pokemonList: GetPokemon[];
  navigation: HomeScreenNavigationProps;
}

interface PokemonListState {
  id: number;
  image: string;
  name: string;
}

export const PokemonList = ({pokemonList, navigation}: PokemonListProps) => {
  const [pokemonImagesList, setPokemonImagesList] = useState<
    PokemonListState[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonImages = async () => {
    const pokemonImages = await Promise.all(
      pokemonList.map(async pokemon => {
        const response = await fetch(pokemon.url);
        const {id, name, sprites} = await response.json();
        return {id, name, image: sprites.front_default};
      }),
    );

    setPokemonImagesList([...pokemonImages]);
    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return <PokemonCard pkmnInfo={item} navigation={navigation} />;
  };

  useEffect(() => {
    getPokemonImages();
  }, []);

  return !isLoading ? (
    <View>
      <FlatList
        data={pokemonImagesList}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  ) : (
    <Text style={styles.loadingText}>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});
