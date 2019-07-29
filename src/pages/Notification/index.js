import React, {Component} from 'react';

import { Text, Image } from 'react-native';
import { Badge } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

class Notification extends Component {

  static navigationOptions = {
    drawerLabel: 'Notificações',
    drawerIcon: ({ tintColor }) => (
      <>
      <Image
        source={require('../../assets/notification.png')}
        style={[{width: 30, height: 30}, {tintColor: tintColor}]}
      />
      <Badge style={{position: 'absolute', right: -10, top: -10}}>3</Badge>
      </>
    ),
  };

  render() {
    const { auth } = this.props;

    return (
        <Text>Notification</Text>
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

