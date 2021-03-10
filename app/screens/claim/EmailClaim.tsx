import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import isEmail from "validator/lib/isEmail";
import { Text, View, TextInput, Button } from "react-native";
import styles from "../../styles";

const EmailClaim = () => {
  const [email, setEmail] = useState(undefined as undefined | string);
  const [error, setError] = useState(undefined as undefined | string);

  return (
    <View>
      <TextInput
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
        onChangeText={(value) => {
          setEmail(value);
        }}
        onBlur={async () => {
          if (isEmail(email)) {
            setError("");
            try {
              await AsyncStorage.setItem("@email", email);
              //for testing console log email from storage
              console.log(await AsyncStorage.getItem("@email"));
            } catch (error) {
              setError(error);
            }
          } else {
            setError("Please enter a valid email");
          }
        }}
      />
      {error && <Text style={styles.claim.errorMessage}>{error}</Text>}
    </View>
  );
};

export default EmailClaim;
