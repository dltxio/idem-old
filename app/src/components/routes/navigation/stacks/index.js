import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "theme";
import Claims from "components/scenes/claims";
import Settings from "components/scenes/settings";
import Vendors from "components/scenes/vendors";
import HeaderLeft from "./HeaderLeft";
import HeaderTitle from "./HeaderTitle";

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator();

const navigationProps = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
};

// ------------------------------------
// Navigators
// ------------------------------------

export const ClaimsNavigator = () => (
  <Stack.Navigator
    initialRouteName="Claims"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Claims"
      component={Claims}
      options={({ navigation }) => ({
        title: "Claims",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
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
  </Stack.Navigator>
);

export const VendorsNavigator = () => (
  <Stack.Navigator
    initialRouteName="Vendors"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Vendors"
      component={Vendors}
      options={({ navigation }) => ({
        title: "3rd Parties",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Claims"
      component={Claims}
      options={({ navigation }) => ({
        title: "Claims",
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
  </Stack.Navigator>
);

export const SettingsNavigator = () => (
  <Stack.Navigator
    initialRouteName="Settings"
    headerMode="screen"
    screenOptions={navigationProps}
  >
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
      name="Vendors"
      component={Vendors}
      options={({ navigation }) => ({
        title: "3rd Parties",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Claims"
      component={Claims}
      options={({ navigation }) => ({
        title: "Claims",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
);
