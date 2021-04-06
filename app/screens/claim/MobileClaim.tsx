import React, { useState } from "react";
import { Text, View, TextInput, ViewStyle, Alert } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import Button from "../../components/Button";
import { observer } from "mobx-react-lite";
import Bodal from "../../components/Bodal";
import { sendMobileCode, verifyMobileCode } from "../../helpers/claim/mobile";

const MobileClaim = ({ item }: { item: IClaim }) => {
  const [mobile, setMobile] = useState(undefined as undefined | string);
  const [error, setError] = useState(undefined as undefined | string);
  const [modalOpen, setModalOpen] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isMobile = (value: string) => {
    return (
      value.length < 13 &&
      !!value.replace(/\s*/g, "").match(/(\+[0-9]{2}|0|[0-9]{2})[0-9]{9}/)
    );
  };

  const verifyMobile = async () => {
    setSubmitting(true);
    try {
      verifyMobileCode(item.value!, code);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  const sendCode = () => {
    setSubmitting(true);
    try {
      Alert.alert(
        "Send verification code?",
        `Would you like to send a verification code to ${item.value}?`,
        [
          {
            text: "Yes",
            onPress: async () => {
              // await sendMobileCode(item.value!);
              setCodeSent(true);
            },
          },
          { text: "No", onPress: () => {} },
        ],
      );
      // TODO: SuccessToast
    } catch (e) {
      console.log(e);
      // TODO: failure toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
        value={
          mobile !== undefined ? mobile : (item.value as undefined | string)
        }
        placeholder="Please enter your mobile number..."
        keyboardType="phone-pad"
        onChangeText={(value) => {
          setMobile(value);
        }}
        onBlur={async () => {
          if (!!mobile && isMobile(mobile)) {
            setError("");
            try {
              item.setValue(mobile);
            } catch (error) {
              setError(error);
            }
          } else {
            setError("Please enter a valid mobile number");
          }
        }}
      />
      {!!error && <Text style={styles.claim.errorMessage}>{error}</Text>}
      <Button
        title={!codeSent ? "Send verification code" : "Verify"}
        style={styles.claim.verifyButton as ViewStyle}
        disabled={submitting}
        onPress={!codeSent ? sendCode : () => setModalOpen(true)}
      />
      <Bodal open={modalOpen} onClose={() => setModalOpen(false)}>
        <View style={{ width: "100%", padding: 10 }}>
          <TextInput
            style={{
              ...styles.claim.input,
              width: "100%",
            }}
            onChangeText={(value) => setCode(value)}
            placeholder="Enter verification code..."
            value={code || undefined}
          />
          <Button
            disabled={submitting}
            title="Verify code"
            onPress={() =>
              !!item.value && isMobile(item.value) && !!code && verifyMobile()
            }
            style={styles.claim.button as ViewStyle}
          />
        </View>
      </Bodal>
    </View>
  );
};

export default observer(MobileClaim);
