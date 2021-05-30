import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { colors } from "../../styles/theme";

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

const Login = () => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Login</Text>
  </View>
);

export default Login;
