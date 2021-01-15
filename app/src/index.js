import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";

// Assets.
import { imageAssets } from "./styles/theme/images";
import { fontAssets } from "./styles/theme/fonts";
import Router from "./components/routes";

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

  if (!didLoad)
    return <View />;
  
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
