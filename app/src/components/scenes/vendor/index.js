﻿﻿import React from "react";
import PropTypes from "prop-types";
import {
  Text, View,
} from "react-native";
import {connect} from "react-redux";
import styles from "../../../styles";

const Vendor = ({ navigation, window, vendor }) => {
  if (vendor == null)
    return null;
  
  return (
    <View style={styles.vendor.root}>
      <Text style={styles.vendor.title}>{vendor.name}</Text>
      <Text style={styles.vendor.url}>{vendor.url}</Text>
    </View>
  );
};

Vendor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  window: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

const mapStateToProps = (state) => ({
  window: state.app.window,
  vendor: state.app.vendors.selected,
});

export default connect(
  mapStateToProps,
  null
)(Vendor);
