import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "../SreenPage/LogIn/LogIn";
import regPag from "../SreenPage/InregistarePage/regPag";
import AppNavigator from "./AppNavigator";
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Register" component={regPag} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} />
    </Stack.Navigator>
  );
}
