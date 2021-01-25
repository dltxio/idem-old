import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import isEmail from "validator/lib/isEmail";
import { Text, View, TextInput, Button } from "react-native";
import styles from "../../../styles";

const EmailClaim = ({ window }) => {
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  return (
    <>
      <TextInput
        style={{
          ...styles.claim.input,
          width: Math.floor(window.width),
        }}
        onChangeText={(value) => {
          setEmail(value);
        }}
        onBlur={async () => {
          if (isEmail(email)) {
            setError("");
            try {
              await AsyncStorage.setItem("@email", email);
              console.log(await AsyncStorage.getItem("@email"));
            } catch (error) {
              setError(error);
            }
          } else {
            setError("Please enter a valid email");
          }
        }}
      />
      <Text style={styles.claim.errorMessage}>{error}</Text>
    </>
  );
};

export default EmailClaim;
