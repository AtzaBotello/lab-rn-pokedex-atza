/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {AddPokemonScreen, DetailsScreen, HomeScreen} from '../src/screens';
import {RootStackParamList} from '../types/types';

const Stack = createStackNavigator<RootStackParamList>();

export const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Add" component={AddPokemonScreen} />
    </Stack.Navigator>
  );
};
