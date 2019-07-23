import React, {Component} from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import firebase from 'react-native-firebase';

class SignIn extends Component {

  fazerLogin = async () => {

    const { auth }            = this.props;
    const { email, password } = this.state; 

    this.props.SigninLoading( auth.loading );

    try {

      await firebase.auth()
        .signInWithEmailAndPassword(email, password);

    } catch(err) {

      this.props.SigninError(err);

    }
  }

  render() {
    const { auth } = this.props;

    return (

      <Container>
        <Text>Login</Text>
      </Container>
    )
  }
};

const mapStateToProps    = state => ({
    auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

