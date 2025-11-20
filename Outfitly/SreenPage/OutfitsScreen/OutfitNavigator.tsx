import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyOutfitsScreen from 'SreenPage/OutfitsScreen/MyOutfitsScreen';
import OutfitDetailsScreen from 'SreenPage/OutfitsScreen/OutfitDetailsScreen';

export type MyOutfitsStackParamList = {
  MyOutfits: undefined;
  OutfitDetails: { outfitId: string };
};

const Stack = createNativeStackNavigator<MyOutfitsStackParamList>();

export default function MyOutfitsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyOutfits" component={MyOutfitsScreen} />
      <Stack.Screen name="OutfitDetails" component={OutfitDetailsScreen} />
    </Stack.Navigator>
  );
}
