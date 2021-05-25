import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, ViewStyle } from "react-native";
import DatePick from "../../components/DatePick";
import { IClaim } from "../../store/assetStore";
import styles from "../../styles";
import { colors } from "../../styles/theme";
import verifyClaim from "../../helpers/claim/verify";
import Button from "../../components/Button";
import moment from "moment";

const DateClaim = ({
  item,
  uploadFile,
}: {
  item: IClaim;
  uploadFile: () => void;
}) => {
  const [showDate, setShowDate] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setShowDate(!showDate)}
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
      >
        <Text style={{ color: item.value ? undefined : colors.gray }}>{`${
          moment(item.value).format('DD/MM/YYYY') || "Please enter the specific date..."
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

export default observer(DateClaim);
