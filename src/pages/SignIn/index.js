import React, {Component} from 'react';

import {
  Text, 
  Dimensions,  
  Animated,
  Keyboard,
  Easing,
} from 'react-native';

import {
  Container,
  Logo,
  Form,
  Input,
  ForgotMyPassword,
  ForgotMyPasswordText,
  ForgotMyPasswordLink,
  LoginButton,
  GoogleButton,
  FacebookButton,
  SignUpCard,
  SignUpButton,
  AnimatedView
} from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import firebase from 'react-native-firebase';

class SignIn extends Component {

  state = {
    email           : "",
    password        : "",
    SignUpDisabled  : new Animated.Value(0),
    LogoOpacity     : new Animated.Value(1),
    LogoScale       : new Animated.Value(1),
    // FormTranslateY  : new Animated.Value(Dimensions.get('window').height * 0.50)
  }

  componentDidMount() {

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {

    Animated.timing(this.state.LogoOpacity, {
      toValue  : 0,
      duration : 300,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.LogoScale, {
      toValue  : 0.01,
      duration : 160,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.SignUpDisabled, {
      toValue  : 1,
      delay    : 160,
      useNativeDriver: true
    }).start();

    // Animated.timing(this.state.FormTranslateY, {
    //   toValue  : Dimensions.get('window').height * 0.10,
    //   duration : 160,
    //   asing    : Easing.ease,
    //   useNativeDriver: true
    // }).start();

  }

  _keyboardDidHide = () => {

    Animated.timing(this.state.LogoOpacity, {
      toValue  : 1,
      duration : 100,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.LogoScale, {
      toValue  : 1,
      duration : 160,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

    // Animated.timing(this.state.FormTranslateY, {
    //   toValue  : Dimensions.get('window').height * 0.50,
    //   duration : 160,
    //   asing    : Easing.ease,
    //   useNativeDriver: true
    // }).start();

  }

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

        <Logo resizeMode="contain" style={{transform: [{scale: this.state.LogoScale}], opacity: this.state.LogoOpacity}} />

        <Form>

          <Form.Content>
            
            <Input
              textContentType = "username"
              label           = "Digite seu E-mail"
              value           = {this.state.email}
              onChangeText    = {email => this.setState({ email })}
            />

            <Input
              textContentType = "password"
              label           = "Digite sua senha"
              secureTextEntry = {true}
              value           = {this.state.password}
              onChangeText    = {password => this.setState({ password })}
            />

            <ForgotMyPassword>

              <ForgotMyPasswordText> Esqueceu sua senha? </ForgotMyPasswordText>

              <ForgotMyPasswordLink onPress={() => console.log('Pressed')} >
                <Text style={{ color: '#009688' }}>Clique aqui</Text>
              </ForgotMyPasswordLink>

            </ForgotMyPassword>

            <LoginButton onPress={() => console.log('Pressed')} >
              Fazer Login
            </LoginButton>

            <GoogleButton onPress={() => console.log('Pressed')} >
              <Text style={{ color: '#DB4A39', fontWeight: '400' }}>Logar com Google</Text>
            </GoogleButton>

            <FacebookButton onPress={() => console.log('Pressed')}>
              Logar com Facebook
            </FacebookButton>
            
          </Form.Content>

          <SignUpCard>
            <SignUpButton onPress={() => console.log('Pressed')} disabled={this.state.SignUpDisabled}></SignUpButton>
          </SignUpCard>
          
        </Form>
        
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

