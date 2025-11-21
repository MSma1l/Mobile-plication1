import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import AppNavigator from './components/AppNavigator';
=======
import AppNavigator from './components/AppNavigator'; // corectăm calea
import OutfitNavigator from "./SreenPage/OutfitsScreen/OutfitNavigator";

>>>>>>> Outfitle

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

