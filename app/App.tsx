import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import Info from "./screens/Info/Info";
import ClaimRequest from './screens/ClaimRequest/ClaimRequest';
import * as Linking from 'expo-linking';

export type Screens = "Info" | "ClaimRequest";

const SAMPLE_REQUEST = {
  claims: [1, 2],
  callbackURL: "https://example.com/callback"
}

const App = () => {
  const [screen, setScreen] = useState<Screens>("ClaimRequest");
  const [claimRequestData, setClaimRequestData] = useState<string | null>("NULL");
  Linking.addEventListener('url', (event) => {
    const data = Linking.parse(event.url);
    setClaimRequestData(JSON.stringify(data.queryParams))
  })

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ margin: 100 }}>{claimRequestData}</Text>
      {screen === "Info" && <Info />}
      {screen === "ClaimRequest" && <ClaimRequest setScreen={setScreen} claimData={SAMPLE_REQUEST} />}
    </View>
  );
};

export default App;
