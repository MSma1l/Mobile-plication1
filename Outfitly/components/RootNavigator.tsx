import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "../components/AuthNavigator";
import AppNavigator from "./AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ importul lipsea


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // verifică dacă userul există în AsyncStorage
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("user");
      setLoggedIn(!!user);
    };

    checkLogin();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!loggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="App" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
}
