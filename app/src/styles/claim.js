﻿﻿import colors from "./theme/colors";

export default {
  root: {
    flex: 1,
      flexDirection: "column",
      alignItems: "center",
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
  uploadButtonWrapper: {
    marginVertical: 12,
  },
  verifyButtonWrapper: {
    position: "absolute",
      bottom: 30,
  },
};
