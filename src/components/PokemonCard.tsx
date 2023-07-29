/* eslint-disable react/react-in-jsx-scope */
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {GetPokemon} from '../../types/types';
import {useEffect, useState} from 'react';
import {HomeScreenNavigationProps} from '../screens';

interface IPkmnInfo {
  id: number;
  image: string;
  name: string;
}

interface CardProps {
  pkmnInfo: IPkmnInfo;
  navigation: HomeScreenNavigationProps;
}

interface StatePkmn {
  id: number;
  abilities: {};
  name: string;
  type: {};
  sprites: {};
}

export const PokemonCard = ({pkmnInfo, navigation}: CardProps) => {
  const handleToDetails = (id: string) => {
    navigation.navigate('Details', {id});
  };

  return (
    <TouchableOpacity onPress={() => handleToDetails(pkmnInfo.id.toString())}>
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>{pkmnInfo.name}</Text>
        </View>
        <View>
          {<Image source={{uri: pkmnInfo.image}} style={styles.image} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  text: {
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
  },
});
