﻿﻿import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, TextInput,
} from "react-native";
import { colors } from "theme";
import {connect} from "react-redux";
import Button from "../../ui/Button";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 32,
    paddingVertical: 12,
  },
  label: {
    fontSize: 18,
    paddingBottom: 12,
    color: "#303030",
  },
  input: {
    borderColor: "#cecece",
    borderWidth: 1,
    padding: 12,
  },
  uploadButtonWrapper: {
    marginVertical: 12,
  },
  verifyButtonWrapper: {
    position: "absolute",
    bottom: 30,
  },
});

const Claim = ({ navigation, window, claim }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{claim?.type}</Text>
      <Text style={styles.label}>Value of claim</Text>
      <TextInput style={{
        ...styles.input,
        width: Math.floor(window.width * 0.5)
      }} />
      <View style={styles.uploadButtonWrapper}>
        <Button title="Select Supporting Document" />
      </View>
      <View style={styles.verifyButtonWrapper}>
        <Button title="Verify" />
      </View>
    </View>
  );
};

Claim.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  window: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

const mapStateToProps = (state) => ({
  window: state.app.window,
  claim: state.app.claims.selected,
});

export default connect(
  mapStateToProps,
  null
)(Claim);
