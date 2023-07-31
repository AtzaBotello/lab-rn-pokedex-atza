import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {HomeScreenNavigationProps} from '../screens';

interface IPkmnInfo {
  name: string;
  url: string;
}
interface CardProps {
  pkmnInfo: IPkmnInfo;
  // navigation: HomeScreenNavigationProps;
  onPress: (id: string) => void;
}

export const PokemonCard = React.memo(({pkmnInfo, onPress}: CardProps) => {
  const [id, setId] = useState('');

  useMemo(() => pkmnInfo, [pkmnInfo]);

  const getId = () => {
    return pkmnInfo.url.split('/')[pkmnInfo.url.split('/').length - 2];
  };

  useEffect(() => {
    setId(getId());
  }, []);

  useEffect(() => {
    console.log('rendered ', pkmnInfo.name);
  }, []);

  return (
    <TouchableOpacity style={styles.touch} onPress={() => onPress(getId())}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.pkmnName}>{pkmnInfo.name}</Text>
            <Text style={styles.pkmnNumber}>#{id}</Text>
          </View>
          <Image
            source={{
              //uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
            }}
            style={styles.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  touch: {
    flex: 1,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 8,
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'flex-start',
  },
  pkmnName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  pkmnNumber: {
    fontSize: 14,
  },
  image: {
    flex: 6,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
