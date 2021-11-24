import React from "react";
import { View, Linking, ViewStyle, Text, Button, } from "react-native";
import styles from "../../styles";
import { observer } from "mobx-react-lite";
import useClaims from "../../hooks/useClaims";
import { colors } from "../../styles/theme";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";

const ExchangeValidator = (path: any) => {
  const params = path.route.state.routes[0].params;
  const rawClaims = params.claims ?? "Not Found";
  const id = params.id ?? "Not Found";
  const returnURL = params.returnURL ?? "Not Found";
  const { claims } = useClaims();

  const requestedClaims = rawClaims.split(",");
  var _claims = claims.filter(claim => {
    return claim.type.some(type => requestedClaims.includes(type));
  });

  const RequestCard = (claim: server.Claim) => {
    return (
      <View 
        key={claim.key}
        style={{
          padding: 5,
          position: "absolute",
          right: 30,
          top: 30,
        }}
      >
        <Text>Requesting Claim: {claim.title}</Text>
      </View>
    );
  }

  const SendClaims = () => {
    let body = JSON.stringify({connectionID: id, claims: _claims});

    fetch(returnURL, {
      method: 'POST',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        },
        body: body
    }).then((response) => response.text())
      .then((responseData) => { console.log("response: " + responseData); })
      .catch((err) => { console.log(err); });
  }

  var claimCards = _claims.map(claim => {
    return RequestCard(claim);
  });

  return (
    <View style={styles.list.root as ViewStyle}>
      <Text>{claimCards}</Text>
      <Button 
        title="Send Claims"
        onPress={() => SendClaims()}
      />
    </View>
  );
};

export default observer(ExchangeValidator);
