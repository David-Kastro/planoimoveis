import React, {Component} from 'react';

import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import FadeAnimation from '../../components/FadeAnimation';

class Notification extends Component {

  static navigationOptions = {
    drawerLabel: 'Notificações',
    drawerIcon: ({ tintColor }) => (
      <>
      <Image
        source={require('../../assets/notification.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
      <Badge style={{position: 'absolute', right: -10, top: -10}}>3</Badge>
      </>
    ),
  };

  state = {
    cardVisibility: false
  }

  render() {
    const { auth }         = this.props;
    const {cardVisibility} = this.state;

    return (

        <View style={{flex: 1, flexDirection: 'column', justifyItems: 'center', alignItems: 'center',marginTop: 100}}>

          <TouchableOpacity 
            style={{backgroundColor: 'red', marginVertical: 10}} 
            onPress={() => this.setState({ cardVisibility: !cardVisibility })}
          >
            <Text style={{color: 'white'}}>Teste</Text>
          </TouchableOpacity>

          <FadeAnimation visible={cardVisibility}>
            <View style={{backgroundColor: 'blue', width:200, height: 200}}></View>
          </FadeAnimation>

        </View>

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
)(Notification);

