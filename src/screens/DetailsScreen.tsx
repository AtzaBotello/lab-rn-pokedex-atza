/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, pokemonTypes} from '../../types/types';
import {RouteProp} from '@react-navigation/native';
import {useEffect, useState} from 'react';

type DetailsScreenNavigatorProps = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailScreenProps {
  navigation: DetailsScreenNavigatorProps;
  route: DetailsScreenRouteProp;
}

export const DetailsScreen = ({navigation, route}: DetailScreenProps) => {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [detailedPokemon, setDetailedPokemon] = useState({});

  const getDetailedInfo = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setDetailedPokemon(data);
    console.log('see', data.abilities[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getDetailedInfo();
  }, []);

  return !isLoading ? (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: detailedPokemon.sprites.front_default}}
            style={styles.image}
          />
        </View>
        <View
          style={[
            styles.descContainer,
            pokemonTypes[detailedPokemon.types[0].type.name],
          ]}>
          <View style={styles.row}>
            <Text style={styles.namePokemon}>
              {id}- {detailedPokemon.name}
            </Text>
          </View>
          <View style={styles.row}>
            {detailedPokemon.types.map((type, index) => (
              <View
                key={index}
                style={{
                  marginHorizontal: 5,
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: pokemonTypes[type.type.name],
                }}>
                <Text
                  key={type.name + detailedPokemon.name}
                  style={[styles.subTitle]}>
                  {type.type.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={[styles.row]}>
            <Text style={styles.subTitle}>Abilities</Text>
          </View>
          <View style={styles.row}>
            {detailedPokemon.abilities.map((ability, index) => {
              return (
                <Text
                  key={index + ability.ability.name}
                  style={styles.subTitle}>
                  {' '}
                  {ability.ability.name}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <Text style={styles.loading}>Cargando...</Text>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ff0022',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
    backgroundColor: 'skyblue',
    borderRadius: 10,
    borderWidth: 10,
    borderColor: '#0088b6',
  },
  descContainer: {
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  image: {
    width: 200,
    height: 200,
  },
  namePokemon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 15,
  },
});
