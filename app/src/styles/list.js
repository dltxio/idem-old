import colors from "./theme/colors";

export default {
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
  },
  itemWrapper: (window) => ({
    paddingVertical: window.height * 0.03,
    paddingHorizontal: window.width * 0.1,
    borderBottomColor: "#cecece",
    borderBottomWidth: 1,
  }),
  itemName: {
    fontSize: 18,
    textAlign: "left",
  }
};
