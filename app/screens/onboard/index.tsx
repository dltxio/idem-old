import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles";

const Onboard = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        top: 60,
        //backgroundColor: "#061121",
      }}
    >
      <Text>On boarding</Text>

      <View
        style={{
          paddingTop: 50,
        }}
      >
        <TextInput
          style={{
            ...styles.claim.input,
            width: styles.layout.window.width,
          }}
          keyboardType="default"
          placeholder="Please enter your first and last names"
        />
        <TextInput
          style={{
            ...styles.claim.input,
            width: styles.layout.window.width,
          }}
          keyboardType="email-address"
          placeholder="Please enter your email address..."
        />
      </View>
    </View>
  );
};

export default Onboard;
