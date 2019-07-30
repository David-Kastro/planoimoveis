import React, {Component} from 'react';

import {
  Text, 
  Dimensions,  
  Animated,
  Keyboard,
  Easing,
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';

import { TouchableRipple } from 'react-native-paper';

import {
  Container,
  ArrowBack,
  ArrowBackIcon,
  Logo,
  Banner,
  BannerHeader,
  BannerText,
  Form,
  Input,
  ForgotMyPassword,
  ForgotMyPasswordText,
  ForgotMyPasswordLink,
  LoginButton,
  Loading,
  LoginButtonContent,
  LoginButtonText,
  SignUpCard,
  SignUpButton,
  AnimatedView
} from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import firebase from 'react-native-firebase';

class SignIn extends Component {

  static navigationOptions = {
    drawerLabel: 'Fazer Login',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/notification.png')}
        style={[{width: 30, height: 30}, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    email           : "",
    password        : "",
    LogoOpacity     : new Animated.Value(1),
    LogoScale       : new Animated.Value(1),
    FormTranslateY  : new Animated.Value(Dimensions.get('window').height * 0.5),
    BannerFade      : new Animated.Value(1),
    BannerTranslate : new Animated.Value(0),
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

    Animated.timing(this.state.FormTranslateY, {
      toValue  : Dimensions.get('window').height * 0.08,
      duration : 160,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.BannerFade, {
      toValue  : 0,
      duration : 200,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.BannerTranslate, {
      toValue  : -20,
      duration : 200,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

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

    Animated.timing(this.state.FormTranslateY, {
      toValue  : Dimensions.get('window').height * 0.50,
      duration : 160,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.BannerFade, {
      toValue  : 1,
      delay    : 200,
      duration : 200,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.BannerTranslate, {
      toValue  : 0,
      delay    : 200,
      duration : 200,
      asing    : Easing.ease,
      useNativeDriver: true
    }).start();

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

      <ImageBackground
        source={require('../../assets/city.jpg')}
        style={{flex: 1}}
        resizeMode="cover"
      >
        <Container>

          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent= {true} />

          {/* <ArrowBack style={{transform: [{scale: this.state.LogoScale}], opacity: this.state.LogoOpacity}}>
              <ArrowBackIcon onPress={() => this.props.navigation.navigate('Main')}/>
          </ArrowBack> */}

          <Logo resizeMode="contain" style={{transform: [{scale: this.state.LogoScale}], opacity: this.state.LogoOpacity}} />

          <Banner style={{transform: [{translateY: this.state.BannerTranslate}], opacity: this.state.BannerFade}}>
            <BannerHeader>O jeito fácil de alugar imóveis</BannerHeader>
            <BannerText>Aluguel rápido, seguro e sem fiador</BannerText>
          </Banner>

          <Form style={{transform: [{translateY: this.state.FormTranslateY}]}}>

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
              
              <LoginButton onPress={() => this.fazerLogin()} >
                <LoginButtonContent>
                  { this.props.auth.loading 
                      ? <Loading animating={true} color="white" />
                      : <LoginButtonText>Fazer Login</LoginButtonText> }
                </LoginButtonContent>
              </LoginButton>
              
            </Form.Content>

            <SignUpCard style={{transform: [{scale: this.state.LogoScale}], opacity: this.state.LogoOpacity}}>
              <SignUpButton onPress={() => console.log('Pressed')}></SignUpButton>
            </SignUpCard>
            
          </Form>
          
        </Container>
      </ImageBackground>
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


