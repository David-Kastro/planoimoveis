import React, {Component} from 'react';

import { Text, Image } from 'react-native';
import { Badge } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

class Credit extends Component {

  static navigationOptions = {
    drawerLabel: 'Avaliação de crédito',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/find_in_page.png')}
        style={[{width: 26, height: 26}, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    const { auth } = this.props;

    return (
        <Text>Credit</Text>
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
)(Credit);

