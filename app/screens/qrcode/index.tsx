import React, { useEffect, useState } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Button, View, StyleSheet } from "react-native";
import styles from "../../styles";
import { sendIdentity } from "../../helpers/identity/login";
import { useRootStore } from "../../store/rootStore";

const Qrcode : React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const claims = useRootStore().Assets.claims;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      //handleBarCodeScanned({type: "test", data: "data"})
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    sendIdentity({id: data, claims: claims});
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.qrCode.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.qrCode.camera}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      <Button title={"send request"} onPress={() => {handleBarCodeScanned({type: "256", data: "abcdefgh-123456"})}} />
    </View>
  );
};

export default Qrcode;
