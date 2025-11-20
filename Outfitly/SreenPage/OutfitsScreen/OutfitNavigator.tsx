import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyOutfitsScreen from './MyOutfitsScreen';
import OutfitDetailsScreen from './OutfitDetailsScreen';

export type OutfitStackParamList = {
  MyOutfits: undefined;
  OutfitDetails: { outfitId: string };
};

const Stack = createNativeStackNavigator<OutfitStackParamList>();

const OutfitNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyOutfits" component={MyOutfitsScreen} />
      <Stack.Screen name="OutfitDetails" component={OutfitDetailsScreen} />
    </Stack.Navigator>
  );
};

export default OutfitNavigator;
