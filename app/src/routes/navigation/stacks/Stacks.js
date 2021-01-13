import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "theme";
import Claims from "scenes/claims";
import Settings from "scenes/settings";
import Details from "scenes/details";
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
    initialRouteName="Home"
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
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: "Details",
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
      name="Details"
      component={Details}
      options={{
        title: "Details",
      }}
    />
  </Stack.Navigator>
);
