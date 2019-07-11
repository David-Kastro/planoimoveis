import React, {Component} from 'react';

import { StyleSheet, Dimensions, View, Image, Text } from 'react-native';
import { TextInput, Button, Card, TouchableRipple } from 'react-native-paper'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

class Main extends Component {

  render() {

    const { auth } = this.props;
    
    return (
      <View style={styles.container}>
      
        <Card elevation={5} style={styles.banner}></Card>

        <Image elevation={6} source={require('../../assets/Planologo.png')} resizeMode="contain" style={styles.logo} />

        <Card elevation={5} style={styles.form}>
          <Card.Content>
          <TextInput
            theme={{
              colors: {
                  primary: '#009688',
              }
            }}
            style={styles.input}
            label='Email'
            dense={true}
          />
          <TextInput
            theme={{
              colors: {
                  primary: '#009688',
              }
            }}
            style={styles.input}
            label='Senha'
            dense={true}
          />

          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 25
            }}
          >
            
            <Text style={{color: '#797979'}}>Esqueceu sua senha?</Text>
            <TouchableRipple
              onPress={() => console.log('Pressed')}
              rippleColor="rgba(0, 150, 136, .32)"
              style={{width: 70, marginLeft: 5}}
            >
              <Text style={{color: '#009688'}}>Clique aqui</Text>
            </TouchableRipple>
          </View>

          <Button 
            icon="lock"
            mode="contained" 
            uppercase={false} 
            style={{marginVertical: 20, borderRadius: 50 }} 
            onPress={() => console.log('Pressed')}
            theme={{
              colors: {
                  primary: '#E30613',
              }
            }}
          >
            Fazer Login
          </Button>

          <Button 
            icon={({ size }) => (
              <Image
                source={require('../../assets/google.png')}
                style={{ width: size, height: size, tintColor: '#DB4A39' }}
              />
            )}
            mode="contained" 
            uppercase={false} 
            style={{marginBottom: 15 }} 
            onPress={() => console.log('Pressed')}
            theme={{
              colors: {
                  primary: '#FFF',
              }
            }}
          >
            <Text style={{color: '#DB4A39', fontWeight: '400'}}>Logar com Google</Text>
          </Button>

          <Button 
            icon={require('../../assets/facebook.png')}
            mode="contained" 
            uppercase={false} 
            style={{marginBottom: 15}} 
            onPress={() => console.log('Pressed')}
            theme={{
              colors: {
                  primary: '#3B5998',
              }
            }}
          >
            Logar com Facebook
          </Button>

          </Card.Content>

          <Card elevation={6} style={{width: 74, height: 74, borderRadius: 37, position: 'absolute', top: -30, right: -15}} >
            <Button 
              icon={() => (
                <View style={{width: '100%', height: '100%'}}>
                  <Image
                    source={require('../../assets/add.png')}
                    style={{ width: 40, height: 40, top: 17, right: 4, tintColor: '#E30613' }}
                  /> 
                </View>
              )}
              mode="contained" 
              uppercase={false} 
              style={{width: 74, height: 74, borderRadius: 37}} 
              onPress={() => console.log('Pressed')}
              theme={{
                colors: {
                    primary: '#fff',
                }
              }}
            ></Button>
          </Card>
          
        </Card>
        
      </View>
      
    )
  }
}

const diferenceWidth = Dimensions.get('window').width / (Dimensions.get('window').height * 0.5);

const styles         = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  banner: {
    width: Dimensions.get('window').height * 0.5,
    height: Dimensions.get('window').height * 0.5,
    borderRadius: Dimensions.get('window').height * 0.25,
    backgroundColor: '#E30613',
    position: 'absolute',
    transform: [
      {scaleX: diferenceWidth * 4},
      {scaleY: diferenceWidth},
      {rotate: '30deg'},
      {translateX: Dimensions.get('window').width * 0.2}
    ]
  },
  form: {
    width: 320,
    height: 350,
    marginVertical: Dimensions.get('window').height * 0.3,
  },
  input: {
    backgroundColor: 'transparent',
  },
  logo: {
    height: Dimensions.get('window').height * 0.15,
    marginVertical: Dimensions.get('window').height * 0.09,
    width: Dimensions.get('window').height * 0.15 * (1950 / 662),
    position: 'absolute',
  },

});

const mapStateToProps = state => ({
  auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
