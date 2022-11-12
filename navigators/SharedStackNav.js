import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Photos from "../screens/Photos";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();
export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: { backgroundColor: "black" },
      }}
    >
      {screenName === "StackFeed" ? (
        <Stack.Screen
          name={"StackFeed"}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ width: 120, height: 40 }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "StackSearch" ? (
        <Stack.Screen name={"StackSearch"} component={Search} />
      ) : null}
      {screenName === "StackNotifications" ? (
        <Stack.Screen name={"StackNotifications"} component={Notifications} />
      ) : null}
      {screenName === "StackMe" ? (
        <Stack.Screen name={"StackMe"} component={Me} />
      ) : null}
      <Stack.Screen name="StackProfile" component={Profile} />
      <Stack.Screen name="StackPhotos" component={Photos} />
    </Stack.Navigator>
  );
}
