﻿import React, { useEffect, useState } from "react";
import { Text, View, Platform, Modal, StyleSheet, Pressable, Alert, Button} from "react-native";
import styles from "../../styles";
import EmailClaim from "./EmailClaim";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import DateClaim from "./DateClaim";
import OtherClaim from "./OtherClaim";
import MobileClaim from "./MobileClaim";
import SelectClaim from "./SelectClaim";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';

const Claim = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(String);
  const [libraryName, setLibraryName] = useState(String)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const uploadFileFromBrowser = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync();
      if (result.type === "success") {
        console.log('result', result.name)
        const base64Img = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
        setModalVisible(true);
        setImage(base64Img);
        setLibraryName('browser');
      }
    } catch(err) {
      console.log("err", err);
    }
  };

  const uploadPhotoFromLibrary = async () => {
    try {
       let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          base64: true
        })
        if (!result.cancelled) {
          const base64Img = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
          console.log('result.uri',base64Img)
          setModalVisible(true);
          setImage(base64Img);
          setLibraryName('gallery');
        }

    } catch(err) {
      console.log("err", err);
    }
  };
  
  const uploadPhotoFromCamera = async () => {
    try {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      // Explore the result
      if (!result.cancelled) {
        const base64Img = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
        console.log('result.uri',base64Img)
        setModalVisible(true);
        setImage(base64Img);
        setLibraryName('camera');
      }
    } catch(err) {
      console.log("err", err);
    }
  };

  const claimsDocuments =  async () => {
    if(image) {
      console.log('libraryName', libraryName);
      if(libraryName === "browser") {await AsyncStorage.setItem("document_url", image);}
      if(libraryName === "gallery") {await AsyncStorage.setItem("library_url", image);}
      if(libraryName === "camera") {await AsyncStorage.setItem("camera_url", image);}
      setModalVisible(false);
    }
  }
  const rootStore = useRootStore();
  const claim = rootStore.Assets.selectedClaim;

  if (!claim) {
    return <View>{/* TODO: error handling for this case */}</View>;
  }

  const renderClaim = (type: string) => {
    switch (type) {
      case "DOB":
        return <DateClaim item={claim} uploadFileFromBrowser={uploadFileFromBrowser} />;
      case "Email":
        return <EmailClaim item={claim} />;
      case "Mobile":
        return <MobileClaim item={claim} />;
      case "18+":
        return (
          <>
          <SelectClaim
            item={claim}
            uploadPhotoFromCamera={uploadPhotoFromCamera}
            uploadFileFromBrowser={uploadFileFromBrowser}
            uploadPhotoFromLibrary={uploadPhotoFromLibrary}
          />
          </>
        );
      default:
        return <OtherClaim item={claim} uploadFileFromBrowser={uploadFileFromBrowser} />;
    }
  };

  return (
    <>
    <View style={styles.claim.root}>
      <Text style={styles.claim.title}>{claim?.type}</Text>
      <Text style={styles.claim.label}>{claim?.description}</Text>
      {renderClaim(claim.type || "")}
    </View>

    {modalVisible ? 
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
            <Text style={styless.modalText}>Are you sure, you want to select this image/document for claims? </Text>
            <View style={{display: "flex", flexDirection: "row"}}>
              <Pressable
                style={[styless.button, styless.buttonClose]}
                onPress={() => claimsDocuments()}
              >
              <Text style={styless.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styless.button, styless.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <Text style={styless.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
        </Modal>
      </View>
      : false}
     
  </>
  );
};

export default observer(Claim);

const styless = StyleSheet.create({
  centeredView: {
    top: 250
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
    elevation: 2,
    width: 80
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