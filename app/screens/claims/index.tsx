import React, { useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/core";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { IClaim } from "../../store/assetStore";
import { colors } from "../../styles/theme";
import Profile from "../profile";


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

  useEffect(() => {
    assetStore.loadClaims();
  }, []);

  if (assetStore.claims == null)
    return (
      <View style={styles.list.root as ViewStyle}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.list.root as ViewStyle}>
      <StatusBar barStyle="light-content" />
      <Profile />
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
  );
};

export default observer(ClaimSelector);
