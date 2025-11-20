import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../components/TabBar/BottonTabs';
import HomeScreen from '../SreenPage/HomeScreen/HomeScreen';
import WardrobeScreen from '../SreenPage/WardrobeScreen/WardrobeScreen';
import AddClothesScreen from '../SreenPage/AddClothesScreen/AddClothesScreen';
import AppScreen from '../SreenPage/AppScreen';
import SettingsScreen from '../SreenPage/ProfileScreen/SettingsScreen';

import OutfitNavigator from '../SreenPage/OutfitsScreen/OutfitNavigator'; // <-- AICI

import { RootStackParamList } from '../hooks/useNavigation'; 

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="WardrobeScreen" component={WardrobeScreen} />
      <Stack.Screen name="AddClothesScreen" component={AddClothesScreen} />
      <Stack.Screen name="AppScreen" component={AppScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

      {/* 👇 AICI introducem navigatorul pentru Outfits */}
      <Stack.Screen name="Outfits" component={OutfitNavigator} />
    </Stack.Navigator>
  );
}
