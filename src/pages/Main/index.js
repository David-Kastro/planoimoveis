import React, {Component} from 'react';

import { View, Text } from 'react-native';
import { Card } from 'react-native-paper'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiZGF2aWRrYXMiLCJhIjoiY2p5ZzNrOXBhMWlxcDNscW91bnYzaGhqMiJ9.Jafi9wsh04DbaaIYjFSrVQ');

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
