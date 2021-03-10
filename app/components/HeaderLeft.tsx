import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { bindActionCreators } from "redux";
import { createAction as createSetNavigationAction } from "../store/app/actions/setNavigation";
import { connect } from "react-redux";

const HeaderLeft = ({ navigation, canGoBack, setNavigation }) => {
  if (!canGoBack) return <View />;

  return (
    <FontIcon.Button
      name="arrow-left"
      color="white"
      backgroundColor="transparent"
      onPress={() => {
        navigation.goBack();
      }}
      style={{
        paddingLeft: 15,
      }}
    />
  );
};

HeaderLeft.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func,
  }),
  lastScene: PropTypes.string,
};

HeaderLeft.defaultProps = {
  navigation: { openDrawer: () => null },
};

const mapStateToProps = (state) => ({
  canGoBack: state.app.navigation.canGoBack,
});

const mapDispatchToProps = (dispatch) => ({
  setNavigation: bindActionCreators(createSetNavigationAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);
