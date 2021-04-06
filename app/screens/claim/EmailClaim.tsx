import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { Text, View, TextInput, ViewStyle } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import { observer } from "mobx-react-lite";
import Button from "../../components/Button";
import verifyClaim from "../../helpers/claim/verify";

const EmailClaim = ({ item }: { item: IClaim }) => {
  const [email, setEmail] = useState(undefined as undefined | string);
  const [error, setError] = useState(undefined as undefined | string);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
        value={email !== undefined ? email : (item.value as undefined | string)}
        keyboardType="email-address"
        placeholder="Please enter your email address..."
        onChangeText={(value) => {
          setEmail(value);
        }}
        onBlur={async () => {
          if (!!email && isEmail(email)) {
            setError("");
            try {
              item.setValue(email);
            } catch (error) {
              setError(error);
            }
          } else {
            setError("Please enter a valid email");
          }
        }}
      />
      {!!error && <Text style={styles.claim.errorMessage}>{error}</Text>}
      <Button
        title="Verify"
        style={styles.claim.verifyButton as ViewStyle}
        disabled={true}
        onPress={() => verifyClaim(item)}
      />
    </View>
  );
};

export default observer(EmailClaim);
