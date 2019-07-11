import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../store/ducks/Authentication";

import firebase from 'react-native-firebase';

class AuthChecker extends Component {

    componentDidMount() {

        const user = firebase.auth().currentUser;

        user == null && this.props.SigninSuccess(user);
        user != null && this.props.SignoutSuccess(user);

    }

    render() {
        return null
    }
};

const mapStateToProps = state => ({
    auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthChecker);