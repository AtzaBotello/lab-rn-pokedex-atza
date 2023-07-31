/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet, Image, SafeAreaView, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, pokemonTypes} from '../../types/types';
import {RouteProp} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

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
  const [bgColor, setBgColor] = useState(null);

  const goBack = () => {
    navigation.goBack();
  }

  const getDetailedInfo = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setDetailedPokemon(data);
    getBackgroundColor(pokemonTypes[data.types[0].type.name]);
    setIsLoading(false);
  };

  const getBackgroundColor = (color: string) => {
    setBgColor(color);
  };

  useEffect(() => {
    getDetailedInfo();
  }, []);

  return (
    <SafeAreaView style={[{backgroundColor: bgColor}]}>
      {!isLoading ? (
        <View style={{height: '100%'}}>
          <Button title='Back' onPress={() => goBack()}></Button>
          <View style={[styles.container, {backgroundColor: bgColor}]}>
            <Text style={styles.namePokemon}>{detailedPokemon.name}</Text>
            <Text style={styles.subTitle}># {id}</Text>

            <View style={[styles.descContainer]}>
              <View style={styles.row}>
                <Image
                  source={{
                    uri: detailedPokemon.sprites.other['official-artwork']
                      .front_default,
                  }}
                  style={styles.image}
                />
              </View>
            </View>
          </View>

          <View style={styles.extrainfoContainer}>
            <Text style={[styles.title, {marginBottom: 5}]}>Tipos</Text>
            <View style={[styles.row, {marginBottom: 10}]}>
              {detailedPokemon.types.map((type, index) => (
                <View
                  key={index}
                  style={[
                    styles.typeBadge,
                    {backgroundColor: pokemonTypes[type.type.name]},
                  ]}>
                  <Text
                    key={type.name + detailedPokemon.name}
                    style={[styles.subTitle]}>
                    {type.type.name}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[styles.title]}>Peso</Text>
            <Text>{detailedPokemon.weight} Kgs</Text>

            <Text style={[styles.title, {marginTop: 20}]}>Sprites</Text>
            <ScrollView horizontal>
              {Object.entries(
                detailedPokemon.sprites.versions['generation-v']['black-white']
                  .animated,
              ).map((sprite, index) => {
                if (sprite[1] !== null) {
                  return (
                    <Image
                      key={index}
                      source={{uri: sprite[1]}}
                      style={styles.spriteImg}
                    />
                  );
                }
              })}
            </ScrollView>

            <Text style={[styles.title, {marginVertical: 5}]}>Habilidades</Text>
            <View style={styles.row}>
              {detailedPokemon.abilities.map((ability, index) => {
                return (
                  <View
                    key={index}
                    style={[styles.typeBadge, {backgroundColor: bgColor}]}>
                    <Text
                      key={ability.name + detailedPokemon.name}
                      style={[styles.subTitle]}>
                      {ability.ability.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.loading}>Cargando...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    borderRadius: 0,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    backgroundColor: 'red',
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
  },
  extrainfoContainer: {
    flexGrow: 1,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  typeBadge: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#0088b6',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.62,

    elevation: 4,
  },
  typeContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  spriteImg: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  namePokemon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
