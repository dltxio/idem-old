import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { imageAssets } from "./styles/theme/images";
import { fontAssets } from "./styles/theme/fonts";
import navRef from "./navigation/navRef";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { RootStoreProvider } from "./store/rootStore";
import { StatusBar } from "expo-status-bar";
import { ClaimProvider } from "./providers/Claim";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

const App = () => {
  const [didLoad, setDidLoad] = useState(false);
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: {
          screens: {
            Claims: "claims",
            "3rd Parites": "3rdParty",
            Settings: "settings",
            Test: "test/:value",
          }
        }
      },
    },
  };

  const handleLoadAssets = async () => {
    // Asset preloading.
    await Promise.all<void | Asset>([...imageAssets, ...fontAssets]);
    setDidLoad(true);
  };

  Linking.addEventListener('Home', () => {
    console.log("linked");
  });

  useEffect(() => {
    handleLoadAssets();
  }, []);

  if (!didLoad) return <View />;

  return (
    <RootStoreProvider>
      <StatusBar style="auto" />
      <NavigationContainer ref={navRef} linking={linking}>
        <ClaimProvider>
          <DrawerNavigator />
        </ClaimProvider>
      </NavigationContainer>
    </RootStoreProvider>
  );
};

export default App;
