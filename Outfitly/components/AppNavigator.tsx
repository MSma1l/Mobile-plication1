import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../components/TabBar/BottonTabs';
import AddClothesScreen from '../SreenPage/AddClothesScreen';
import { RootStackParamList } from '../hooks/useNavigation'; // doar tipurile

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="AddClothesScreen" component={AddClothesScreen} />
    </Stack.Navigator>
  );
}
