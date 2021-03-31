import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "../../styles";
import { IClaim } from "../../store/assetStore";
import { observer } from "mobx-react-lite";

const MobileClaim = ({ item }: { item: IClaim }) => {
  const [mobile, setMobile] = useState(undefined as undefined | string);
  const [error, setError] = useState(undefined as undefined | string);

  const isMobile = (value: string) => {
    return (
      value.length < 13 &&
      !!value.replace(/\s*/g, "").match(/(\+[0-9]{2}|0|[0-9]{2})[0-9]{9}/)
    );
  };

  return (
    <View>
      <TextInput
        style={{
          ...styles.claim.input,
          width: styles.layout.window.width,
        }}
        value={
          mobile !== undefined ? mobile : (item.value as undefined | string)
        }
        placeholder="Please enter your mobile number..."
        keyboardType="phone-pad"
        onChangeText={(value) => {
          setMobile(value);
        }}
        onBlur={async () => {
          if (!!mobile && isMobile(mobile)) {
            setError("");
            try {
              item.setValue(mobile);
            } catch (error) {
              setError(error);
            }
          } else {
            setError("Please enter a valid mobile number");
          }
        }}
      />
      {!!error && <Text style={styles.claim.errorMessage}>{error}</Text>}
    </View>
  );
};

export default observer(MobileClaim);
