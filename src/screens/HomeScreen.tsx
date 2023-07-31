/* eslint-disable react/react-in-jsx-scope */
import {useContext, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
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
  const {state, setPokedex, setShow} = useContext(PokemonContext);
  const {data, isLoading} = useFecth(
    'https://pokeapi.co/api/v2/pokemon?limit=151',
  );

  const getAllPokemon = () => {
    setPokedex(data);
    setShow(false);
  };

  const goToDetails = (id: string) => {
    navigation.navigate('Details', {id});
  };

  useEffect(() => {
    if (!isLoading) {
      getAllPokemon();
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.safeAreaBg}>
      <ImageBackground
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/800px-Pok%C3%A9_Ball_icon.svg.png',
        }}
        resizeMode="center"
        style={styles.image}
      />
      {!state.isLoadingCtx ? (
        <>
          <Text style={styles.title}>Pokedex</Text>
          <PokemonList pokemonList={state.pokemons} onPress={goToDetails} />
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaBg: {
    //backgroundColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});
