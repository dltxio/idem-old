import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, StatusBar, FlatList, Dimensions,
} from "react-native";
import { colors } from "theme";
import {bindActionCreators} from "redux";
import {createAction as createKeyAction} from "../../../store/user/actions/createKey";
import {connect} from "react-redux";

const styles = StyleSheet.create({
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
  claim: {
    fontSize: 18,
    height: 44,
    paddingTop: 25,
    marginBottom: 25,
    paddingLeft: 80,
    paddingRight: 80,
    textAlign: "left",
  },
});

const claimRowStyle = (window) => ({
  borderBottomColor: "#cecece",
  borderBottomWidth: 1,
  width: window.width,
});

const Claim = ({ window, name }) => (
  <View style={claimRowStyle(window)}>
    <Text style={styles.claim}>{name}</Text>
  </View>
);

const Claims = ({ navigation, user, app }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content"/>
    <FlatList
      data={[
        {key: "18+"},
        {key: "DOB"},
        {key: "Full Name"},
        {key: "Email"},
        {key: "Mobile"},
        {key: "Address"},
      ]}
      renderItem={({item}) =>
        <Claim
          name={item.key}
          window={app.window}
        />
      }
    />
  </View>
);

Claims.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Claims.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  createKey: bindActionCreators(createKeyAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Claims);
