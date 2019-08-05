import React, {Component} from 'react';

import { Text, Image, View, ScrollView, Dimensions } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";
import { Creators as PropertiesActions } from "../../store/ducks/Properties";

import FadeAnimation from '../../components/FadeAnimation';

import { Transition } from 'react-navigation-fluid-transitions';


class Property extends Component {

  state = {
    load: false,
  }

  componentDidMount() {

  this.setState({ load: true })
    
  }

  close() {
    this.props.navigation.goBack()
  }

  render() {
    const { auth, properties } = this.props;
    const {image, id} = properties.properties.filter( property => property.id == properties.selectedProperty )[0]

    return (
      <>
        <View style={{flex:1, flexDirection: 'column'}}>
          <Transition shared={`property_${id}`}>
            <Image source={image} style={{width: '100%', height: 280, position:'absolute'}}></Image>
          </Transition>
          
          <ScrollView
            ref={(scrollView) => { this._scrollView = scrollView }}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}
            contentContainerStyle={{paddingTop: 250}}
          >
            <View style={{width: '100%', marginVertical:20, height: (Dimensions.get('window').height + 250), backgroundColor: 'white'}}><Text>(Em desenvolvimento...)</Text></View>
          </ScrollView>
        </View>

        <View style={{position: 'absolute', top: 30, right: 10}}>
          <FadeAnimation visible={this.state.load}>
            <Ripple 
              rippleColor="#fff" 
              rippleOpacity={1} 
              onPress={() => this.close()}
            >
              <IconButton
                icon="clear"
                color="white"
                size={40}
                style={{width: 40}}
              />
            </Ripple>
          </FadeAnimation>
        </View>

        <View style={{position: 'absolute', bottom: 20, alignItems: 'center', width: '100%'}}>
          <FadeAnimation visible={this.state.load}>
            <Ripple 
              rippleColor="#fff" 
              rippleOpacity={1} 
              onPress={() => this.close()}
            >
              <Avatar.Icon size={60} color="white" icon="event" theme={{colors: {primary: '#0080ff'}}} />
            </Ripple>
          </FadeAnimation>
        </View>
      </>
    )
  }
};

const mapStateToProps = state => ({
  auth: state.authReducers,
  properties: state.propertiesReducers
});

const mapDispatchToProps = dispatch => bindActionCreators({...AuthActions, ...PropertiesActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);

