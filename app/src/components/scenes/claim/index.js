﻿﻿import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, TextInput,
} from "react-native";
import { colors } from "../../../styles/theme";
import {connect} from "react-redux";
import Button from "../../ui/Button";
import styles from "../../../styles";

const Claim = ({ navigation, window, claim }) => {
  return (
    <View style={styles.claim.root}>
      <Text style={styles.claim.title}>{claim?.type}</Text>
      <Text style={styles.claim.label}>Value of claim</Text>
      <TextInput style={{
        ...styles.claim.input,
        width: Math.floor(window.width * 0.5)
      }} />
      <View style={styles.claim.uploadButtonWrapper}>
        <Button title="Select Supporting Document" />
      </View>
      <Button
        title="Verify"
        style={styles.claim.verifyButton}
      />
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
