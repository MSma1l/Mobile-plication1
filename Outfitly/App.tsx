import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import AppNavigator from './components/AppNavigator'; // corectăm calea
import OutfitNavigator from "./SreenPage/OutfitsScreen/OutfitNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* Daca vrei să folosești OutfitNavigator în loc de AppNavigator,
          înlocuiește cu <OutfitNavigator /> */}
    </NavigationContainer>
  );
}

