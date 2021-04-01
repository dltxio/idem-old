import { observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import { IClaim } from "../../store/assetStore";
import styles from "../../styles";
import RNPickerSelect from "react-native-picker-select";

const SelectClaim = ({
  item,
  options,
}: {
  item: IClaim;
  options: { label: string; value: string }[];
}) => {
  return (
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
  );
};

export default observer(SelectClaim);
