import { observer } from "mobx-react-lite";
import React, { useState, useEffect} from "react";
import { View, ViewStyle, Switch } from "react-native";
import { IClaim } from "../../store/assetStore";
import styles from "../../styles";
import Button from "../../components/Button";
import verifyClaim from "../../helpers/claim/verify";

const SelectClaim = ({
  item,
  uploadFile,
}: {
  item: IClaim;
  uploadFile: () => void;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    const convertBoolToString: string = String(isEnabled);
    item.setValue(convertBoolToString)
  }
  useEffect(() => {
    if(item.value === "undefined") {
      item.value = "true"
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.claim.input,
          ...styles.claim.switchButtonAlign as ViewStyle,
          width: styles.layout.window.width,
        }}
      >
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.value === 'true' ? true: false}
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
