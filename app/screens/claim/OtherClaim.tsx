import React from "react";
import { View, TextInput, ViewStyle } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import { observer } from "mobx-react-lite";
import Button from "../../components/Button";
import { verifyClaim } from "../../helpers/claim/verify";

const OtherClaim = ({
  item,
  uploadFileFromBrowser,
}: {
  item: IClaim;
  uploadFileFromBrowser: () => void;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
        value={`${item.value || ""}`}
        placeholder="Please enter your claim..."
        onChangeText={(value) => {
          item.setValue(value);
        }}
      />
      <Button
        title="Add Supporting Document From Device"
        style={styles.claim.uploadButton as ViewStyle}
        onPress={uploadFileFromBrowser}
      />
      <Button
        title="Verify"
        style={styles.claim.verifyButton as ViewStyle}
        disabled={true}
        onPress={() => verifyClaim(item)}
      />
    </View>
  );
};

export default observer(OtherClaim);
