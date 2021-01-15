import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {
  StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity,
} from "react-native";
import { colors } from "theme";
import {bindActionCreators} from "redux";
import {
  createAction as createSetNavigationAction
} from "../../../store/app/actions/setNavigation";
import {
  createAction as createSelectClaimAction
} from "../../../store/app/actions/selectClaim";
import {
  createAction as createLoadAssetAction
} from "../../../store/app/actions/loadAsset";
import {connect} from "react-redux";
import assets from "../../../lib/assets";

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

const Claim = ({ onPress, window, type }) => (
  <TouchableOpacity style={claimRowStyle(window)} onPress={onPress}>
    <Text style={styles.claim}>{type}</Text>
  </TouchableOpacity>
);

const ClaimSelector = ({
  navigation,
  app,
  selectClaim,
  setNavigation,
  loadAsset,
}) => {
  useEffect(() => {
    (async () => {
      const claims = await assets.fetch(assets.Type.Claims);
      loadAsset(assets.Type.Claims, claims);
    })();
  }, []);
  
  useEffect(() => {
    navigation.addListener("focus", () => {
      setNavigation({
        canGoBack: false,
      });
    });
  }, [navigation]);
  
  if (app.assets.claims == null)
    return (
      <View style={styles.root}>
        <Text>Loading...</Text>
      </View>
    );
  
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content"/>
      <FlatList
        data={app.assets.claims}
        renderItem={({item}) =>
          <Claim
            {...item}
            window={app.window}
            onPress={() => {
              selectClaim(item);
              setNavigation({
                canGoBack: true,
              });
              navigation.navigate("Claim");
            }}
          />
        }
      />
    </View>
  );
};

ClaimSelector.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

ClaimSelector.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  setNavigation: bindActionCreators(createSetNavigationAction, dispatch),
  selectClaim: bindActionCreators(createSelectClaimAction, dispatch),
  loadAsset: bindActionCreators(createLoadAssetAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimSelector);
