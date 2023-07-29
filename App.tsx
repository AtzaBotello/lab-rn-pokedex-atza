import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './navigation/AppNavigation';
import {PokemonProvider} from './src/context/PokemonProvider';
import { styles } from '../lab-rn-ios-calculator-clone-atza/src/theme/CalculatorScreen.styles';

function App(): JSX.Element {
  return (
    <PokemonProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PokemonProvider>
  );
}

export default App;
