import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../styles/theme";
import HeaderLeft from "../components/HeaderLeft";
import HeaderTitle from "../components/HeaderTitle";
import Vendors from "../screens/vendors";
import Settings from "../screens/settings";
import ClaimsStackNavigator from "./ClaimsStackNavigator";
import VendorsStackNavigator from "./VendorsStackNavigator";
import Login from "../screens/auth";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      headerTintColor: "white",
      headerStyle: { backgroundColor: colors.darkPurple },
      headerTitleStyle: { fontSize: 18 },
      tabBarIcon: ({ focused }) => {
        const iconFromRouteName: { [key: string]: string } = {
          Claims: "address-book",
          "3rd Parties": "university",
          Settings: "cog",
          Login: "user",
        };

        return (
          <FontIcon
            name={iconFromRouteName[route.name] ?? "square"}
            color={focused ? colors.lightPurple : colors.gray}
            size={20}
            solid
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.lightPurple,
      inactiveTintColor: colors.gray,
      style: {
        // backgroundColor: "white",
        // borderTopColor: "gray",
        // borderTopWidth: 1,
        // paddingBottom: 5,
        // paddingTop: 5,
      },
    }}
    initialRouteName="Claims"
  >
    <Tab.Screen name="Claims" component={ClaimsStackNavigator} />
    <Tab.Screen name="3rd Parties" component={VendorsStackNavigator} />
    <Tab.Screen name="Settings" component={Settings} />
    <Tab.Screen name="Login" component={Login} />
    
  </Tab.Navigator>
);

export default TabNavigator;
