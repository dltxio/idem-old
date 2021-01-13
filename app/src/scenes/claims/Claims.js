import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, StatusBar,
} from "react-native";
import Button from "components/Button";
import { colors } from "theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

const Claims = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Claims</Text>
    <Button
      title="Go to Settings"
      color="white"
      backgroundColor={colors.lightPurple}
      onPress={() => {
        navigation.navigate("Settings", { from: "Claims" });
      }}
    />
  </View>
);

Claims.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Claims.defaultProps = {
  navigation: { navigate: () => null },
};

export default Claims;
