import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

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
      <PagerView style={styles.viewPager} initialPage={0}>
        <View
          style={{
            paddingTop: 50,
          }}
        >
          <TextInput
            keyboardType="default"
            placeholder="Please enter your first and last names"
          />
          <TextInput
            keyboardType="email-address"
            placeholder="Please enter your email address..."
          />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboard;
