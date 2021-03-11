import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HeaderLeft from "../components/HeaderLeft";
import HeaderTitle from "../components/HeaderTitle";
import Vendors from "../screens/vendors";
import Vendor from "../screens/vendor";

const Stack = createStackNavigator();

const VendorsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="3rd Party List"
        component={Vendors}
        options={({ navigation }) => ({
          title: "3rd Parties",
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

export default VendorsStackNavigator;
