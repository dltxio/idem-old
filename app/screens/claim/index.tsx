﻿import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import Button from "../../components/Button";
import styles from "../../styles";
import verifyClaim from "../../helpers/claim/verify";
import DatePick from "../../components/DatePick";
import EmailClaim from "./EmailClaim";
import * as DocumentPicker from "expo-document-picker";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

const Claim = () => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(undefined as string | undefined);

  const uploadFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    console.log(res);
    //TODO choose files to upload and save to local storage or local database
  };
  const rootStore = useRootStore();
  const claim = rootStore.Assets.selectedClaim;

  const renderClaim = (type: string) => {
    switch (type) {
      case "DOB":
        return (
          <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <TextInput
                style={{
                  ...styles.claim.input,
                  width: styles.layout.window.width,
                }}
                onFocus={() => {
                  setShowDate(true);
                }}
                value={date}
              />
            </TouchableWithoutFeedback>
            <DatePick
              show={showDate}
              handleCloseDate={() => {
                setShowDate(false);
              }}
              handleDateChange={(value) => {
                setDate(new Date(value).toLocaleDateString());
                setShowDate(false);
              }}
            />
          </View>
        );
      case "Email":
        return <EmailClaim />;
      default:
        return (
          <TextInput
            style={{
              ...styles.claim.input,
              width: styles.layout.window.width,
            }}
          />
        );
    }
  };

  return (
    <View style={styles.claim.root}>
      <Text style={styles.claim.title}>{claim?.type}</Text>
      <Text style={styles.claim.label}>{claim?.description}</Text>
      {renderClaim(claim?.type || "")}

      <Button
        title="Add Supporting Document From Device"
        style={styles.claim.uploadButton as ViewStyle}
        onPress={uploadFile}
      />
      <Button
        title="Verify"
        style={styles.claim.verifyButton as ViewStyle}
        disabled={true}
        onPress={() => verifyClaim(claim)}
      />
    </View>
  );
};

export default observer(Claim);
