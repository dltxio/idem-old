import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";

const DatePick = ({ show, handleDateChange }) => {
  return (
    <View>
      {show && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          is24Hour={true}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePick;
