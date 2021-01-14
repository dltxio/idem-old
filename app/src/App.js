import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { Provider } from "react-redux";
import store from "utils/store";

// Assets.
import { imageAssets } from "theme/images";
import { fontAssets } from "theme/fonts";
import Router from "./components/routes";

// Dimensions.
const window = Dimensions.get("window");

const App = () => {
  const [didLoad, setDidLoad] = useState(false);
  const [dimensions, setDimensions] = useState({ window });
  
  const onChange = ({ window }) => {
    setDimensions({ window });  
  };
  
  useEffect(() => {
      Dimensions.addEventListener("change", onChange);
      return () => {
        Dimensions.removeEventListener("change", onChange);  
      };
  }, []);

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
      <Router />
    </Provider>
  );
};

export default App;
