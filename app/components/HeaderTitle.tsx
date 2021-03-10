import React from "react";
import { Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const HeaderTitle = () => (
  <Text
    style={{
      fontSize: 22,
      color: "#ffffff",
    }}
  >
    {useRoute().name}
  </Text>
);

HeaderTitle.propTypes = {};
HeaderTitle.defaultProps = {};

export default HeaderTitle;
