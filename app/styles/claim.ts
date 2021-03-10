﻿import { FlexAlignType, FlexStyle } from "react-native";
import colors from "./theme/colors";

export default {
  root: {
    flex: 1,
    flexDirection: "column" as FlexStyle["flexDirection"],
    alignItems: "center" as FlexAlignType,
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 32,
    paddingVertical: 12,
  },
  label: {
    fontSize: 18,
    paddingBottom: 12,
    color: "#303030",
  },
  input: {
    borderColor: "#cecece",
    borderWidth: 1,
    padding: 12,
  },
  uploadButton: {
    position: "absolute" as FlexStyle["position"],
    bottom: 90,
    height: 50,
    justifyContent: "center" as FlexAlignType,
    left: 10,
    right: 10,
  },
  verifyButton: {
    position: "absolute" as FlexStyle["position"],
    bottom: 30,
    height: 50,
    justifyContent: "center" as FlexAlignType,
    left: 10,
    right: 10,
  },
  errorMessage: {
    color: "red",
  },
};
