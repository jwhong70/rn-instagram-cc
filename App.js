import React from "react";
import { View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isDark = useColorScheme() === "dark";
  const [loading, setloading] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }
        await persistCache({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
        });
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require("./assets/logo.png"));
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setloading(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);
  if (!loading) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer>
            {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
          </NavigationContainer>
        </ThemeProvider>
      </ApolloProvider>
    </View>
  );
}
