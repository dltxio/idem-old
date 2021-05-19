import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

import AsyncStorage from "@react-native-community/async-storage";
import claims from "../../../assets/claims.json";
const emailKey = claims.find(x => x.type === "Email");
const getEmailFromStorage: () => string | '' =  () => AsyncStorage.getItem(emailKey?.key);

const styles = StyleSheet.create({

  userRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },

});
const Profile = () => (
  
  <View style={styles.userRow}>
    <View style={styles.userImage}>
      <Avatar rounded size="large" source={{ uri: 'https://i.imgur.com/FmeKYGe.jpg' }} />
    </View>
    <View>
      <Text style={{ fontSize: 16 }}>Ronaldo Effertz</Text>
      <Text
        style={{
          color: "gray",
          fontSize: 16,
        }}
      >
        {getEmailFromStorage()}
        ronaldo.effertz@gmail.com
      </Text>
    </View>
  </View>
);

export default Profile;
