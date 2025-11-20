import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Ecrane
import HomeScreen from '../../SreenPage/HomeScreen/HomeScreen';
import WardrobeScreen from '../../SreenPage/WardrobeScreen/WardrobeScreen';  
import AddClothesScreen from '../../SreenPage/AddClothesScreen/AddClothesScreen';  
import SettingsScreen from '../../SreenPage/ProfileScreen/SettingsScreen';

// Componente 
import AddButton from '../AddButton';
import OutfitNavigator from '../../SreenPage/OutfitsScreen/OutfitNavigator'; // importăm stack-ul Outfit

// Stiluri
import { tabBarStyles } from '../TabBar/TabBarStyle';

// Definim tipurile Stack Navigator părinte
export type RootStackParamList = {
  Tabs: undefined;
  AddClothesScreen: undefined;
};

type BottomTabsNavigationProp = NavigationProp<RootStackParamList, 'Tabs'>;

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const navigation = useNavigation<BottomTabsNavigationProp>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { ...tabBarStyles.tabBar, overflow: 'visible' },
        tabBarLabelStyle: tabBarStyles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Wardrobe" 
        component={WardrobeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="hanger" size={size} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={HomeScreen} 
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => (
            <AddButton
              {...props}
              onPress={() => navigation.navigate('AddClothesScreen')}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Outfit" 
        component={OutfitNavigator} // Aici punem Stack-ul complet
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="tshirt-crew-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
