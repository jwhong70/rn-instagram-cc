import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";

const Stack = createNativeStackNavigator();
export default function MessagesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen
        name="Room"
        options={{ headerBackTitleVisible: false }}
        component={Room}
      />
    </Stack.Navigator>
  );
}
