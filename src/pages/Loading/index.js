import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import firebase from 'react-native-firebase';

class Loading extends Component {

    componentDidMount() {

        firebase.auth().onAuthStateChanged( user => {

            if( user ) {

                this.props.SigninSuccess(user._user);
                this.props.navigation.navigate('Main');

            } else {

                this.props.navigation.navigate('SignIn');
                this.props.SignoutSuccess();

            }

        })

    }

    render() {
        return null
    }
};

const mapStateToProps = state => ({
    auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Loading);