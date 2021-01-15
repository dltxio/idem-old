import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, StatusBar,
} from "react-native";
import { colors } from "../../../styles/theme";

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

const Vendors = ({ route, navigation }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>3rd Parties</Text>
    </View>
  );
};

Vendors.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

Vendors.defaultProps = {
  route: { params: { from: "" } },
  navigation: { goBack: () => null },
};

export default Vendors;
