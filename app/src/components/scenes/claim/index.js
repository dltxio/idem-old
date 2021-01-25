﻿import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { colors } from "../../../styles/theme";
import { connect } from "react-redux";
import Button from "../../ui/Button";
import styles from "../../../styles";
import verifyClaim from "../../../lib/claim/verify";
import DatePick from "../../ui/DatePick/DatePick";
import EmailClaim from "./EmailClaim";

const Claim = ({ navigation, window, claim }) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState();
  return (
    <View style={styles.claim.root}>
      <Text style={styles.claim.title} type="date">
        {claim?.type}
      </Text>
      <Text style={styles.claim.label} type="date">
        {claim?.description}
      </Text>
      <Text style={styles.claim.label}>Value of claim</Text>
      {claim?.type === "DOB" && (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
            <TextInput
              style={{
                ...styles.claim.input,
                width: Math.floor(window.width),
              }}
              onFocus={() => {
                setShowDate(true);
              }}
              value={date}
            />
          </TouchableWithoutFeedback>
          <DatePick
            show={showDate}
            handleDateChange={(value, selectedDate) => {
              setDate(new Date(selectedDate).toLocaleDateString());
              setShowDate(Platform.OS === "ios");
            }}
          />
        </>
      )}
      {claim?.type === "Email" && <EmailClaim window={window} />}

      {claim?.type !== "Email" && claim?.type !== "DOB" && (
        <TextInput
          style={{
            ...styles.claim.input,
            width: Math.floor(window.width),
          }}
        />
      )}

      <Button
        title="Add Supporting Document From Device"
        style={styles.claim.uploadButton}
      />
      <Button
        title="Verify"
        style={styles.claim.verifyButton}
        onPress={() => verifyClaim(claim)}
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
    height: PropTypes.number,
  }),
};

const mapStateToProps = (state) => ({
  window: state.app.window,
  claim: state.app.claims.selected,
});

export default connect(mapStateToProps, null)(Claim);
