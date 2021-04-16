import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { Text, View, TextInput, ViewStyle } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import { observer } from "mobx-react-lite";
import Button from "../../components/Button";
import {
  sendEmailVerificationEmail,
  verifyEmailCode,
} from "../../helpers/claim/email";

const EmailClaim = ({ item }: { item: IClaim }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState<boolean>(false);

  const onVerifyPress = async () => {
    if (!item.value) {
      // this should never happen because button should be disabled
      return;
    }
    setLoading(true);

    if (code) {
      try {
        await verifyEmailCode({ email: item.value, code: code });
      } catch (e) {
        console.log(e);
        const error = e as server.ErrorResponse;
        if (error.reason === "bad_request") {
          // do something
        }

        if (error.reason === "not_found") {
          // do something different
        }
        return;
      }
      setIsVerifySuccess(true);
    } else {
      try {
        await sendEmailVerificationEmail({ email: item.value });
      } catch (e) {
        console.log(e);
        const error = e as server.ErrorResponse;
        if (error.reason === "bad_request") {
          // do something
        }

        if (error.reason === "not_found") {
          // do something different
        }
      }
      setIsEmailSent(true);
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
      {isEmailSent && (
        <TextInput
          style={{
            ...styles.claim.input,
            width: styles.layout.window.width,
          }}
          value={code !== undefined ? code : ""}
          placeholder="Please enter the code..."
          onChangeText={(value) => {
            setCode(value);
          }}
        />
      )}
      {!!isVerifySuccess && <Text>Verify success</Text>}
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
