import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigatoare
import BottomTabs from './TabBar/BottonTabs';
import OutfitNavigator from '../SreenPage/OutfitsScreen/OutfitNavigator';

// Pagini principale
import HomeScreen from '../SreenPage/HomeScreen/HomeScreen';
import WardrobeScreen from '../SreenPage/WardrobeScreen/WardrobeScreen';
import AddClothesScreen from '../SreenPage/AddClothesScreen/AddClothesScreen';
import AppScreen from '../SreenPage/AppScreen';

// Pagini din profil
import SettingsScreen from '../SreenPage/ProfileScreen/settingsPage/SettingsScreen';
import FavoritePage from '../SreenPage/ProfileScreen/FavoritePage/FavoritePage';
import AboutPage from '../SreenPage/ProfileScreen/AboutPage/aboutPage';

// Tipuri pentru navigare (dacă folosești TS)
import { RootStackParamList } from '../hooks/useNavigation';

// Creeăm navigatorul
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Navigarea principală pe Tab-uri */}
      <Stack.Screen name="Tabs" component={BottomTabs} />

      {/* Pagini individuale */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="WardrobeScreen" component={WardrobeScreen} />
      <Stack.Screen name="AddClothesScreen" component={AddClothesScreen} />
      <Stack.Screen name="AppScreen" component={AppScreen} />

      {/* Setări și paginile profilului */}
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="FavoritePage"
        component={FavoritePage}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="AboutPage"
        component={AboutPage}
        options={{ title: 'Help & About' }}
      />

      {/* Navigatorul pentru Outfits */}
      <Stack.Screen name="Outfits" component={OutfitNavigator} />
    </Stack.Navigator>
  );
}
