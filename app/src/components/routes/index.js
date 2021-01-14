import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Main from "./navigation";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createAction as createAuthenticateAction} from "../../store/user/actions/authenticate";

const Routes = ({ authenticate, user }) => {
  useEffect(() => {
    authenticate();
  }, []);

  if (!user.isAuthenticated)
    return <Text>Authenticating...</Text>;
  
  return <Main />;
};

Routes.propTypes = {
  actions: PropTypes.shape({
    authenticate: PropTypes.func,
  }),
  checked: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

Routes.defaultProps = {
  actions: {
    authenticate: () => null,
  },
  checked: false,
  loggedIn: false,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: bindActionCreators(createAuthenticateAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
