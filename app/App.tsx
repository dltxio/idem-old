import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Linking from "expo-linking";
import { imageAssets } from "./styles/theme/images";
import { fontAssets } from "./styles/theme/fonts";
import navRef from "./navigation/navRef";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { RootStoreProvider } from "./store/rootStore";

const App = () => {
  const [didLoad, setDidLoad] = useState(false);

  const handleLoadAssets = async () => {
    // Asset preloading.
    await Promise.all<void | Asset>([...imageAssets, ...fontAssets]);
    setDidLoad(true);
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      handleUrl(initialUrl);
    }
  };

  useEffect(() => {
    handleLoadAssets();
    return Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });
  }, []);

  const handleUrl = (url: string) => {
    let { path, queryParams } = Linking.parse(url);
    if (!path) {
      return;
    }
    navRef.current
      ? navRef.current.navigate(path, { ...queryParams })
      : setTimeout(() => {
          // Recursive until navigation exists
          handleUrl(url);
        }, 1000);
  };

  if (!didLoad) return <View />;

  return (
    <RootStoreProvider>
      <NavigationContainer ref={navRef}>
        <DrawerNavigator />
      </NavigationContainer>
    </RootStoreProvider>
  );
};

export default App;
