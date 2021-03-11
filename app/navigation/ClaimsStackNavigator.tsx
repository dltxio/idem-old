import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HeaderLeft from "../components/HeaderLeft";
import HeaderTitle from "../components/HeaderTitle";
import Claims from "../screens/claims";
import Claim from "../screens/claim";
import Vendor from "../screens/vendor";

const Stack = createStackNavigator();

const ClaimsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Claims List"
        component={Claims}
        options={({ navigation }) => ({
          title: "Claims",
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
};

export default ClaimsStackNavigator;
