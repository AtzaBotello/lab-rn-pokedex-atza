/* eslint-disable react/react-in-jsx-scope */
import {useContext, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFecth} from '../hooks/useFetch';
import {PokemonContext} from '../context/PokemonContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {PokemonList} from '../components/PokemonList';

export type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {state, setPokedex} = useContext(PokemonContext);
  const {data, isLoading} = useFecth(
    'https://pokeapi.co/api/v2/pokemon?limit=151',
  );

  return (
    <SafeAreaView style={styles.safeAreaBg}>
      {!state.isLoading ? (
        <PokemonList pokemonList={state.pokemons} navigation={navigation} />
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaBg: {
    backgroundColor: 'red',
    flex: 1,
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
