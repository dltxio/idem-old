import React, { useEffect } from "react";
import { Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createAction as createAuthenticateAction } from "../store/user/actions/authenticate";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";

const Routes = ({ authenticate, user }) => {
  useEffect(() => {
    authenticate();
  }, []);

  if (!user.isAuthenticated) return <Text>Authenticating...</Text>;

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: bindActionCreators(createAuthenticateAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
