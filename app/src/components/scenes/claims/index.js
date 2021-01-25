import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {
  Text, View, StatusBar, FlatList, TouchableOpacity,
} from "react-native";
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
import styles from "../../../styles";

const ClaimListItem = ({ onPress, window, type, description }) => (
  <TouchableOpacity style={styles.list.itemWrapper(window)} onPress={onPress}>
    <Text style={styles.list.itemName}>{type}</Text>
    <Text>{description}</Text>
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
      <View style={styles.list.root}>
        <Text>Loading...</Text>
      </View>
    );
  
  return (
    <View style={styles.list.root}>
      <StatusBar barStyle="light-content"/>
      <FlatList
        data={app.assets.claims}
        style={{width: app.window.width}}
        renderItem={({item}) =>
          <ClaimListItem
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
