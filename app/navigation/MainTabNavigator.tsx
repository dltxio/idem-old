import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../styles/theme";
import HeaderLeft from "../components/HeaderLeft";
import HeaderTitle from "../components/HeaderTitle";
import Claims from "../screens/claims";
import Vendors from "../screens/vendors";
import Settings from "../screens/settings";

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
    <Tab.Screen
      name="Claims"
      component={Claims}
      options={({ navigation }) => ({
        title: "Claims",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Tab.Screen
      name="3rd Parties"
      component={Vendors}
      options={({ navigation }) => ({
        title: "3rd Parties",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={({ navigation }) => ({
        title: "Settings",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Tab.Navigator>
);

// TODO: MAKE A CLAIMS STACK
{
  /* <Stack.Screen
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
/> */
}

export default TabNavigator;
