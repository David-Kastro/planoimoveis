import React, {Component} from 'react';

import { View, Text } from 'react-native';
import { Card } from 'react-native-paper'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

class Main extends Component {

  render() {

    const { auth } = this.props;
    
    return (
      <View>
        <Text>Main Page</Text>
      </View>
      
    )
  }
}

const mapStateToProps = state => ({
  auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
