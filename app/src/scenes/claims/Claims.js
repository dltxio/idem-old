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
  claimRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 400,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 60,
  },
  claimContainer: {
    flex: 1,
  },
  claimLabel: {
    fontSize: 16,
    textAlign: "left",
  },
});

const Claim = ({ label }) => (
  <View style={styles.claimRow}>
    <View style={styles.claimContainer}>
      <Text style={styles.claimLabel}>{ label }</Text>
    </View>
    <View style={styles.claimContainer}>
      <Button
        title="Upload documents"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => { }}
      />
    </View>
  </View>
);

const Claims = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Claims</Text>
    <Claim label={"18+"} />
    <Claim label={"DOB"} />
    <Claim label={"Full Name"} />
    <Claim label={"Email"} />
    <Claim label={"Mobile"} />
    <Claim label={"Address"} />
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
