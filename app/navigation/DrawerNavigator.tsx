import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import DrawerMenu from "../components/DrawerMenu";
import TabNavigator from "./MainTabNavigator";

const Drawer = createDrawerNavigator();

const DrawerMenuContainer = (props: DrawerContentComponentProps) => {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter((item) => item.name !== "Home");
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerMenuContainer}>
    <Drawer.Screen name="Home" component={TabNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
