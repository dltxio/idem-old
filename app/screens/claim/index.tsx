﻿import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";
import EmailClaim from "./EmailClaim";
import * as DocumentPicker from "expo-document-picker";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import DateClaim from "./DateClaim";
import OtherClaim from "./OtherClaim";
import MobileClaim from "./MobileClaim";
import SelectClaim from "./SelectClaim";

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
        return <DateClaim item={claim} uploadFile={uploadFile} />;
      case "Email":
        return <EmailClaim item={claim} />;
      case "Mobile":
        return <MobileClaim item={claim} />;
      case "18+":
        return (
          <SelectClaim
            item={claim}
            uploadFile={uploadFile}
          />
        );
      default:
        return <OtherClaim item={claim} uploadFile={uploadFile} />;
    }
  };

  return (
    <View style={styles.claim.root}>
      <Text style={styles.claim.title}>{claim?.type}</Text>
      <Text style={styles.claim.label}>{claim?.description}</Text>
      {renderClaim(claim.type || "")}
    </View>
  );
};

export default observer(Claim);
