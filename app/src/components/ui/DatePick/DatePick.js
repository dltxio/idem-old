import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePick = ({ show, handleDateChange, handleColseDate }) => {
  return (
    <View>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={handleColseDate}
      />
    </View>
  );
};
export default DatePick;
