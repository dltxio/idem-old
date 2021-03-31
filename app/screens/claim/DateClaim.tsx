import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import DatePick from "../../components/DatePick";
import { IClaim } from "../../store/assetStore";
import styles from "../../styles";
import { colors } from "../../styles/theme";

const DateClaim = ({ item }: { item: IClaim }) => {
  const [showDate, setShowDate] = useState(false);
  console.log(item);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowDate(!showDate)}
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
      >
        <Text style={{ color: item.value ? undefined : colors.gray }}>{`${
          item.value || "Please enter the specific date..."
        }`}</Text>
      </TouchableOpacity>
      <DatePick
        show={showDate}
        handleCloseDate={() => {
          setShowDate(false);
        }}
        handleDateChange={(value) => {
          item.setValue(value.toLocaleDateString());
          setShowDate(false);
        }}
      />
    </View>
  );
};

export default observer(DateClaim);
