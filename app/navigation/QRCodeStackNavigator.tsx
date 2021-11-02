import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HeaderLeft from "../components/HeaderLeft";
import HeaderTitle from "../components/HeaderTitle";
import qrCode from "../screens/qrcode";

const Stack = createStackNavigator();

const VendorsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scan QR Code"
        component={qrCode}
        options={({ navigation }) => ({
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle title="QR Code" />,
        })}
      />
    </Stack.Navigator>
  );
};

export default VendorsStackNavigator;
