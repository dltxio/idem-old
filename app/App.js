import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import { imageAssets } from "./styles/theme/images";
import { fontAssets } from "./styles/theme/fonts";
import Navigation from "./navigation";

const App = () => {
  const [didLoad, setDidLoad] = useState(false);

  const handleLoadAssets = async () => {
    // Asset preloading.
    await Promise.all([...imageAssets, ...fontAssets]);
    setDidLoad(true);
  };

  useEffect(() => {
    handleLoadAssets();
  }, []);

  if (!didLoad) return <View />;

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
