import { observer } from "mobx-react-lite";
import React from "react";
import { View, ViewStyle } from "react-native";
import { IClaim } from "../../store/assetStore";
import styles from "../../styles";
import RNPickerSelect from "react-native-picker-select";
import Button from "../../components/Button";
import verifyClaim from "../../helpers/claim/verify";

const SelectClaim = ({
  item,
  options,
  uploadFile,
}: {
  item: IClaim;
  options: { label: string; value: string }[];
  uploadFile: () => void;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
      >
        <RNPickerSelect
          value={item.value}
          items={options}
          onValueChange={(value) => item.setValue(value)}
        />
      </View>
      <Button
        title="Add Supporting Document From Device"
        style={styles.claim.uploadButton as ViewStyle}
        onPress={uploadFile}
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

export default observer(SelectClaim);
