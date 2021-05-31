import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { colors } from "../../styles/theme";
import Qrcode  from "../qrcode"
import { useRootStore } from "../../store/rootStore";


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 60,
  },
});

const Settings = () => {
  const rootStore = useRootStore();
  const assetStore = rootStore.Assets;
  return(
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Settings</Text>
      <View  
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {assetStore.claims[0] &&<Qrcode claim={assetStore.claims.find((c => c.key === "0x02"))!} />}
      </View>
    </View>
  )
};

export default Settings;
