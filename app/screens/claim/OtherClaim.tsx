import React from "react";
import { View, TextInput } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import { observer } from "mobx-react-lite";

const OtherClaim = ({ item }: { item: IClaim }) => {
  return (
    <View>
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
    </View>
  );
};

export default observer(OtherClaim);
