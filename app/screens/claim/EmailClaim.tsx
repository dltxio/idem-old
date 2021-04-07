import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { Text, View, TextInput, ViewStyle } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import { observer } from "mobx-react-lite";
import Button from "../../components/Button";
import { sendEmailVerificationEmail } from "../../helpers/claim/email";

const EmailClaim = ({ item }: { item: IClaim }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onVerifyPress = async () => {
    if (!item.value) {
      // this should never happen because button should be disabled
      return;
    }
    setLoading(true);

    try {
      await sendEmailVerificationEmail(item.value);
    } catch (x) {
      // todo - display error user.
      console.log(x);
    }

    setLoading(false);
  };

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
        disabled={!item.value}
        onPress={onVerifyPress}
      />
    </View>
  );
};

export default observer(EmailClaim);
