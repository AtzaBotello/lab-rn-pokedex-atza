/* eslint-disable react/react-in-jsx-scope */
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {GetPokemon} from '../../types/types';
import {PokemonCard} from './PokemonCard';
import {HomeScreenNavigationProps} from '../screens';
import {useState, useEffect} from 'react';

interface PokemonListProps {
  pokemonList: GetPokemon[];
  //navigation: HomeScreenNavigationProps;
  onPress: (id: string) => void;
}

interface PokemonListState {
  id: number;
  image: string;
  name: string;
}

export const PokemonList = ({pokemonList, onPress}: PokemonListProps) => {

  const [pokemonImagesList, setPokemonImagesList] = useState<
    PokemonListState[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonImages = () => {

    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return <PokemonCard pkmnInfo={item} onPress={onPress} />;
  };

  useEffect(() => {
    getPokemonImages();
  }, []);

  return !isLoading ? (
    <View style={styles.pokemonListContainer}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        style={styles.pokemonList}
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
  pokemonListContainer: {
    width: '100%',
  },
});
