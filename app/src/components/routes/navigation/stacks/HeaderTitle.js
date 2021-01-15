import React from "react";
import { StyleSheet, Text } from "react-native";
import {useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({
  logo: {
    fontSize: 22,
    color: "#ffffff",
  },
});

const HeaderTitle = () => (
  <Text style={styles.logo}>{ useRoute().name }</Text>
);

HeaderTitle.propTypes = {};
HeaderTitle.defaultProps = {};

export default HeaderTitle;
