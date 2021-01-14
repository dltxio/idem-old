import React, {useEffect, useState} from "react";
import {Dimensions, Text} from "react-native";
import Main from "./navigation";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
  createAction as createAuthenticateAction
} from "../../store/user/actions/authenticate";
import {
  createAction as createSetWindowDimensionsAction
} from "../../store/app/actions/setWindowDimensions";

// Dimensions.
const window = Dimensions.get("window");

const Routes = ({ authenticate, setWindowDimensions, user }) => {
  const [dimensions, setDimensions] = useState({ window });

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions({ window });
    };
    
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  
  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    setWindowDimensions(dimensions.window.width, dimensions.window.height);
  }, [dimensions])

  if (!user.isAuthenticated)
    return <Text>Authenticating...</Text>;
  
  return <Main />;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: bindActionCreators(createAuthenticateAction, dispatch),
  setWindowDimensions: bindActionCreators(createSetWindowDimensionsAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
