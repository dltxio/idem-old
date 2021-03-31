import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { Text, View, TextInput } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";

const EmailClaim = ({ item }: { item: IClaim }) => {
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
          if (email && isEmail(email)) {
            setError("");
            try {
              item.update({ value: email });
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
