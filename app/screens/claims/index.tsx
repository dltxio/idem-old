import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { bindActionCreators } from "redux";
import { createAction as createSetNavigationAction } from "../../store/app/actions/setNavigation";
import { createAction as createSelectClaimAction } from "../../store/app/actions/selectClaim";
import { createAction as createLoadAssetAction } from "../../store/app/actions/loadAsset";
import { connect } from "react-redux";
import assets, { AssetType } from "../../helpers/assets";
import styles from "../../styles";

type ClaimsListItemProps = {
  onPress: () => void;
  type: AssetType;
  description: string;
};

// TODO: give correct types
type ClaimSelectorProps = {
  navigation: any;
  app: any;
  selectClaim: any;
  setNavigation: any;
  loadAsset: any;
};

const ClaimListItem = ({ onPress, type, description }: ClaimsListItemProps) => (
  <TouchableOpacity
    style={styles.list.itemWrapper(styles.layout.window)}
    onPress={onPress}
  >
    <Text style={styles.list.itemName}>{type}</Text>
    <Text style={{ color: "#707070" }}>{description}</Text>
  </TouchableOpacity>
);

const ClaimSelector = ({
  navigation,
  app,
  selectClaim,
  setNavigation,
  loadAsset,
}: ClaimSelectorProps) => {
  useEffect(() => {
    (async () => {
      const claims = await assets.fetch(assets.AssetType.Claims);
      loadAsset(assets.AssetType.Claims, claims);
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
      <View style={styles.list.root as ViewStyle}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.list.root as ViewStyle}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={app.assets.claims}
        style={{ width: app.window.width }}
        renderItem={({ item }) => (
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
        )}
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

const mapStateToProps = (state: any) => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = (dispatch: any) => ({
  setNavigation: bindActionCreators(createSetNavigationAction, dispatch),
  selectClaim: bindActionCreators(createSelectClaimAction, dispatch),
  loadAsset: bindActionCreators(createLoadAssetAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimSelector);
