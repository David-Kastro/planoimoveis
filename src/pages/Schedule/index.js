import React, {Component} from 'react';

import { Text, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

class Schedule extends Component {

  static navigationOptions = {
    drawerLabel: 'Seus Agendamentos',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/event.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    const { auth } = this.props;

    return (
        <Text>Schedule</Text>
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
)(Schedule);

