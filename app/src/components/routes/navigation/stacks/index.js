import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../../../styles/theme";
import HeaderLeft from "./HeaderLeft";
import HeaderTitle from "./HeaderTitle";
import Claims from "../../../scenes/claims";
import Settings from "../../../scenes/settings";
import Vendors from "../../../scenes/vendors";
import Claim from "../../../scenes/claim";
import Vendor from "../../../scenes/vendor";

const Stack = createStackNavigator();

const navigationProps = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
};

export const ClaimsNavigator = () => (
  <AppNavigator initialRoute="Claims" />
);

export const VendorsNavigator = () => (
  <AppNavigator initialRoute="3rd Parties" />
);

export const SettingsNavigator = () => (
  <AppNavigator initialRoute="Settings" />
);

export const AppNavigator = ({ initialRoute }) => (
  <Stack.Navigator
    initialRouteName={initialRoute}
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Claims"
      component={Claims}
      options={({ navigation }) => ({
        title: "Claims",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="3rd Parties"
      component={Vendors}
      options={({ navigation }) => ({
        title: "3rd Parties",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={({ navigation }) => ({
        title: "Settings",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Claim"
      component={Claim}
      options={({ navigation }) => ({
        title: "Claim",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Vendor"
      component={Vendor}
      options={({ navigation }) => ({
        title: "Vendor",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
);
