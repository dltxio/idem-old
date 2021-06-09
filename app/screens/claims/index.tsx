import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ViewStyle,
  Modal,
  Pressable,
  StyleSheet,
  Alert
} from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/core";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { IClaim } from "../../store/assetStore";
import { colors } from "../../styles/theme";
import Profile from "../profile";
import * as Linking from "expo-linking";

// const  prefix = Linking.makeUrl("/");
type ClaimsListItemProps = {
  onPress: () => void;
  item: IClaim;
};

const ClaimListItem = ({ onPress, item }: ClaimsListItemProps) => (
  
  <TouchableOpacity
    style={styles.list.itemWrapper(styles.layout.window)}
    onPress={onPress}
  >
    <Text style={styles.list.itemName}>{item.type}</Text>
    <Text style={{ color: colors.gray }}>{item.description}</Text>
    {!item.value ? (
      <View
        style={{
          padding: 5,
          borderRadius: 5,
          borderColor: colors.gray,
          position: "absolute",
          right: 30,
          top: 30,
          borderWidth: 1,
        }}
      >
        <Text>Not Supplied</Text>
      </View>
    ) : !item.isVerified ? (
      <View
        style={{
          padding: 5,
          borderRadius: 5,
          borderColor: colors.gray,
          position: "absolute",
          right: 30,
          top: 30,
          borderWidth: 1,
        }}
      >
        <Text>Not Verified</Text>
      </View>
    ) : null}
  </TouchableOpacity>
);

const ClaimSelector = () => {
  const navigation = useNavigation();
  const rootStore = useRootStore();
  const assetStore = rootStore.Assets;
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any | null>(null);

  // const linking = {
  //   prefixes: [prefix],
  // };
  // console.log('linking========>S', linking);
  const handleDeepLink = (event: any) => {
    console.log('event', event);
    const data = Linking.parse(event.url);
    console.log('data', data)
    setData(data);
  }

  useEffect(() => {
    assetStore.loadClaims();
    // const  getInitialUrl = async () => {
    //   const initialUrl = await Linking.getInitialURL();
    //   console.log('initialUrl', initialUrl);
    //   if(initialUrl) setData(Linking.parse(initialUrl));
    // }
    var NativeLinking=require("../../node_modules/react-native/Libraries/Linking/NativeLinking").default
    NativeLinking.getInitialURL().then((url: any) => {
      console.log('Initial url is: ' + url);
      setData(Linking.parse(url))
    }).catch((err:any) => {console.error('An error occurred', err)});
    Linking .addEventListener("url", handleDeepLink);
    if(!data) {
      // getInitialUrl();
      setModalVisible(true);
    } else {
    }
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  if (assetStore.claims == null)
    return (
      <View style={styles.list.root as ViewStyle}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <>
      <View style={styles.list.root as ViewStyle}>
        <StatusBar barStyle="light-content" />
        {assetStore.claims[0] && <Profile fullName={assetStore.claims.find((c => c.key === "0x02"))!} emailAddress={assetStore.claims.find((c => c.key === "0x03"))!} />}
        <View style={{ flex: 1, width: "100%" }}>
          {assetStore.claims.map((item, index) => {
            return (
              <>
              <ClaimListItem
                key={index}
                item={item}
                onPress={() => {
                  rootStore.Assets.setClaimKey(item.key);
                  navigation.navigate("Claim");
                }}
              />
              </>
            );
          })}
        </View>
      </View>
      {data ? 
      <View style={styless.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
        <View style={styless.centeredView}>
          <View style={styless.modalView}>
            <Text style={styless.modalText}>Host Name:- {data.hostname}</Text>
            <Text style={styless.modalText}>{JSON.stringify(data)}</Text>
            <Pressable
              style={[styless.button, styless.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styless.textStyle}>Ok</Text>
            </Pressable>
            <Pressable
              style={[styless.button, styless.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styless.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
      {/* <Pressable
        style={[styless.button, styless.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styless.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
      : null}
    </>
  );
};

export default observer(ClaimSelector);

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 350,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});