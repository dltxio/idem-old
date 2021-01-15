﻿import colors from "./theme/colors";

export default {
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 32,
    paddingTop: 12,
  },
  url: {
    fontSize: 16,
    paddingBottom: 12,
    color: "#707070",
  },
  description: {
    marginVertical: 5,
    fontSize: 18,
    paddingBottom: 18,
    color: "#151515",
  },
  claimsWrapper: (window) => ({
    width: window.width,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: window.width * 0.1,
  }),
  claimsTitle: {
    fontSize: 16,
  },
  claimValue: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
  },
  registerButton: {
    position: "absolute",
    bottom: 30,
    height: 50,
    justifyContent: "center",
    left: 10,
    right: 10,
  },
};
