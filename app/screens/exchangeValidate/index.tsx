import React from "react";
import { View, Linking, ViewStyle, Text, } from "react-native";
import styles from "../../styles";
import { observer } from "mobx-react-lite";

const ExchangeValidator = (path: any) => {
  const deepLink = path.route.params?.value ?? "Not Found";
  return (
    <View style={styles.list.root as ViewStyle}>
      <Text>{deepLink}</Text>
    </View>
  );
};

export default observer(ExchangeValidator);
