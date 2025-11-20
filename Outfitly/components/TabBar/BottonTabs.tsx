import React from 'react';
import { createBottomTabNavigator, BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Ecrane
import HomeScreen from '../../SreenPage/HomeScreen/HomeScreen';
import WardrobeScreen from '../../SreenPage/WardrobeScreen/WardrobeScreen';  
import AddClothesScreen from '../../SreenPage/AddClothesScreen/AddClothesScreen';  
import AppScreen from '../../SreenPage/AppScreen';
import SettingsScreen from '../../SreenPage/ProfileScreen/settingsPage/SettingsScreen';
import ProfilePage from '../../SreenPage/ProfileScreen/ProfilePage';


// Componente 
import AddButton from '../AddButton';

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

  // Tipăm funcția pentru tabBarIcon
  const renderTabIcon = (
    IconComponent: typeof Ionicons | typeof MaterialCommunityIcons,
    name: string
  ) => ({ color, size }: { color: string; size: number }) => (
    <IconComponent name={name as any} size={size} color={color} />
  );

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
          tabBarIcon: renderTabIcon(Ionicons, 'home-outline'),
        }}
      />
      <Tab.Screen 
        name="Wardrobe" 
        component={WardrobeScreen}
        options={{
          tabBarIcon: renderTabIcon(MaterialCommunityIcons, 'hanger'),
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={HomeScreen} 
        options={{
          tabBarLabel: '',
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <AddButton
              {...props}
              onPress={() => navigation.navigate('AddClothesScreen')}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Outfit" 
        component={AppScreen}
        options={{
          tabBarIcon: renderTabIcon(MaterialCommunityIcons, 'tshirt-crew-outline'),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfilePage}
        options={{
          tabBarIcon: renderTabIcon(Ionicons, 'person-outline'),
        }}
      />
    </Tab.Navigator>
  );
}
