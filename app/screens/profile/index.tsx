import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import claims from "../../assets/claims.json";

const getEmailFromStorage = async (): Promise<string | undefined> => {
  const emailKey = claims.find((x) => x.type === "Email");
  console.log('emailKeyffff', emailKey)

  if (!emailKey) {
    return undefined;
  }

  const result = await AsyncStorage.getItem(emailKey.key);

  return result ? result : undefined;
};

const saveEmailToStorage = async (): Promise<void> => {
  const emailKey = claims.find((x) => x.type === "Email");
  console.log('emailKey', emailKey)

  if (!emailKey) {
    return undefined;
  }

  return AsyncStorage.setItem(emailKey.key, "anthony.hinchliff@gmail.com");
};

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
const Profile = () => {
  useEffect(() => {
    saveEmailToStorage().then(() => {
      getEmailFromStorage().then((r) => {
        console.log(r);
      });
    });
  }, []);
  return (
    <View style={styles.userRow}>
      <View style={styles.userImage}>
        <Avatar
          rounded
          size="large"
          source={{ uri: "https://i.imgur.com/FmeKYGe.jpg" }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 16 }}>Ronaldo Effertz</Text>
        <Text
          style={{
            color: "gray",
            fontSize: 16,
          }}
        >
          ronaldo.effertz@gmail.com
        </Text>
      </View>
    </View>
  );
};

export default Profile;
