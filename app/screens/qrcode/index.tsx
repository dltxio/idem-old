import React, { useEffect, useState } from "react";
import { IClaim } from "../../store/assetStore";
import SvgQRCode from 'react-native-qrcode-svg';
import { observer } from "mobx-react-lite";
import * as Linking from "expo-linking";
import { Text } from "react-native";

const  prefix = Linking.makeUrl("/");

const Qrcode : React.FC<{claim: IClaim}> = ({ claim }) => {

  const [data, setData] = useState<any | null>(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Settings: "Settings"
      },
    },
  };

  // console.log('linking=====>', linking);

  const handleDeepLink = (event: any) => {
    console.log('event', event);
    const data = Linking.parse(event.url);
    setData(data);
  }

  useEffect(() => {
     const  getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if(initialUrl) setData(Linking.parse(initialUrl));
    }
    Linking .addEventListener("url", handleDeepLink);
    if(!data) {
      getInitialUrl();
    }
    return () => {
      // Linking.removeEventListener("url");
    };
  }, [])
  return (
    <>
    <Text>{data ? JSON.stringify(data): 'Hello'}</Text>
    <SvgQRCode value={'exp://192.168.1.141:19000'} />
    </>
  );
};

export default observer(Qrcode);
