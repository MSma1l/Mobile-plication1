import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../components/TabBar/BottonTabs';
import HomeScreen from '../SreenPage/HomeScreen/HomeScreen';
import WardrobeScreen from '../SreenPage/WardrobeScreen/WardrobeScreen';
import AddClothesScreen from '../SreenPage/AddClothesScreen/AddClothesScreen';
import AppScreen from '../SreenPage/AppScreen';
import SettingsScreen from '../SreenPage/ProfileScreen/settingsPage/SettingsScreen';
import { RootStackParamList } from '../hooks/useNavigation'; 

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="WardrobeScreen" component={WardrobeScreen} options={{ title: 'Wardrobe' }} />
      <Stack.Screen name="AddClothesScreen" component={AddClothesScreen} options={{ title: 'Add Clothes' }} />
      <Stack.Screen name="AppScreen" component={AppScreen} options={{ title: 'App' }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}