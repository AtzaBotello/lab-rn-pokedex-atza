/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, PokemonSearchScreen} from '../src/screens';
import { TabBar } from '../src/components/TabBar';

const Tab = createBottomTabNavigator();

export const BottonTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={PokemonSearchScreen} />
    </Tab.Navigator>
  );
};
