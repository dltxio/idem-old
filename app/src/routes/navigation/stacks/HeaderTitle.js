import React from "react";
import { StyleSheet, Text } from "react-native";
import { images } from "theme";

const styles = StyleSheet.create({
  logo: {
    fontSize: 22,
    color: "#ffffff",
  },
});

const HeaderTitle = () => (
  <Text style={styles.logo}>Blockchain ID</Text>
);

HeaderTitle.propTypes = {};
HeaderTitle.defaultProps = {};

export default HeaderTitle;
