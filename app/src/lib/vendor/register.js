import { Linking } from "react-native";

const register = async (vendor) => {
  Linking.openURL(vendor.url);
};

export default register;
