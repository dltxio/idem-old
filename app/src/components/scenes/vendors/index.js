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
  createAction as createSelectVendorAction
} from "../../../store/app/actions/selectVendor";
import {
  createAction as createLoadAssetAction
} from "../../../store/app/actions/loadAsset";
import {connect} from "react-redux";
import assets from "../../../lib/assets";
import styles from "../../../styles";

const VendorListItem = ({ onPress, window, name, url }) => (
  <TouchableOpacity style={styles.list.itemWrapper(window)} onPress={onPress}>
    <Text style={styles.list.itemName}>{name}</Text>
    <Text style={{ color: "#707070" }}>{url}</Text>
  </TouchableOpacity>
);

const VendorSelector = ({
 navigation,
 app,
 selectVendor,
 setNavigation,
 loadAsset,
}) => {
  useEffect(() => {
    (async () => {
      const vendors = await assets.fetch(assets.Type.Vendors);
      loadAsset(assets.Type.Vendors, vendors);
    })();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setNavigation({
        canGoBack: false,
      });
    });
  }, [navigation]);

  if (app.assets.vendors == null)
    return (
      <View style={styles.list.root}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.list.root}>
      <StatusBar barStyle="light-content"/>
      <FlatList
        data={app.assets.vendors}
        style={{width: app.window.width}}
        keyExtractor={(item) => item.url}
        renderItem={({item}) =>
          <VendorListItem
            key={item.url}
            {...item}
            window={app.window}
            onPress={() => {
              selectVendor(item);
              setNavigation({
                canGoBack: true,
              });
              navigation.navigate("Vendor");
            }}
          />
        }
      />
    </View>
  );
};

VendorSelector.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

VendorSelector.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  setNavigation: bindActionCreators(createSetNavigationAction, dispatch),
  selectVendor: bindActionCreators(createSelectVendorAction, dispatch),
  loadAsset: bindActionCreators(createLoadAssetAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorSelector);
