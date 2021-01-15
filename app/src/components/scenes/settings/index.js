import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, StatusBar,
} from "react-native";
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
    marginBottom: 60,
  },
});

const Settings = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Settings</Text>
  </View>
);

Settings.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
};

Settings.defaultProps = {
  navigation: { navigate: () => null },
};

export default Settings;
