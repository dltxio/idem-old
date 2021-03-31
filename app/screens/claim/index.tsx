﻿import React from "react";
import { Text, View, ViewStyle } from "react-native";
import Button from "../../components/Button";
import styles from "../../styles";
import verifyClaim from "../../helpers/claim/verify";
import EmailClaim from "./EmailClaim";
import * as DocumentPicker from "expo-document-picker";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import DateClaim from "./DateClaim";
import OtherClaim from "./OtherClaim";
import MobileClaim from "./MobileClaim";

const Claim = () => {
  const uploadFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    console.log(res);
    //TODO choose files to upload and save to local storage or local database
  };
  const rootStore = useRootStore();
  const claim = rootStore.Assets.selectedClaim;

  if (!claim) {
    return <View>{/* TODO: error handling for this case */}</View>;
  }

  const renderClaim = (type: string) => {
    switch (type) {
      case "DOB":
        return <DateClaim item={claim} />;
      case "Email":
        return <EmailClaim item={claim} />;
      case "Mobile":
        return <MobileClaim item={claim} />;
      default:
        return <OtherClaim item={claim} />;
    }
  };

  return (
    <View style={styles.claim.root}>
      <Text style={styles.claim.title}>{claim?.type}</Text>
      <Text style={styles.claim.label}>{claim?.description}</Text>
      {renderClaim(claim.type || "")}

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
