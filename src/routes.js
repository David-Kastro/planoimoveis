import React, {Component} from 'react';

import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { Transition, createFluidNavigator } from 'react-navigation-fluid-transitions';
import { ScrollView, View, Image, ImageBackground } from 'react-native';
import { Avatar, Button, Text, TouchableRipple } from 'react-native-paper'

import Loading from '~/pages/Loading';
import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';
import Schedule from '~/pages/Schedule';
import Notification from '~/pages/Notification';
import Credit from '~/pages/Credit';
import Property from '~/pages/Property';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "./store/ducks/Authentication";

import firebase from 'react-native-firebase';

const signOut = async (props) => {
    
    const { auth }            = props;

    props.SignoutLoading( auth.loading );

    try {

        await firebase.auth().signOut();

    } catch(err) {

        props.SignoutError(err);

    }   
}

const CustomComponent = (props) => (

    <SafeAreaView>
        <Image
            source={require('./assets/city.jpg')}
            style={{flex: 1, width: '100%', height: 220, position: 'absolute'}}
            resizeMode="cover"
        />
        <View style={{width: '100%', height: 220, backgroundColor: 'rgba(227, 6, 19, 0.6)'}}>
            <View style={{width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                <Image source={require('./assets/Planologo.png')} resizeMode="contain" style={{height: 75, marginTop: 20}} />
            </View>

            <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableRipple
                    onPress={() => signOut(props)}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Text style={{marginVertical: 5, marginHorizontal: 10, color: 'rgba(255,255,255,0.9)', fontSize: 18}}>Sair</Text>
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => console.log('Pressed')}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Text style={{marginVertical: 5, marginHorizontal: 10, color: 'rgba(255,255,255,0.9)', fontSize: 18}}>Configurações</Text>
                </TouchableRipple>
            </View>
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const mapStateToProps    = state => ({
    auth: state.authReducers
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

CustomDrawerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomComponent);

const DrawerStack = createDrawerNavigator({

    Main: {
        screen: Main
    },

    Schedule: {
        screen: Schedule
    },

    Notification: {
        screen: Notification
    },

    Credit: {
        screen: Credit
    },

},{
    initialRouteName: 'Main',
    contentOptions: {
        activeTintColor: '#E30613',
        labelStyle: {fontSize: 18, fontWeight: 'normal'}
    },
    drawerPosition: "right",
    contentComponent: CustomDrawerComponent
});

const FluidStack = createFluidNavigator({
    DrawerStack,
    Property: {
        screen: Property
    }
},{
    initialRouteName: 'DrawerStack',
    transitionConfig: {
        duration: 500,
        useNativeDriver: true
    }
})

const AppStack  = createStackNavigator({ 
    FluidStack,
},{
    initialRouteName: 'FluidStack',
    headerMode: 'none',
});

const Routes    = createAppContainer(createSwitchNavigator({ 
    Loading: {
        screen: Loading
    },

    SignIn: {
        screen: SignIn
    },

    AppStack,
},{
    initialRouteName: 'Loading',
}));

/*-------------- Temporário -----------------------*/
const defaultGetStateForAction = Routes.router.getStateForAction;
Routes.router.getStateForAction = (action, state) => {
    const {type, routeName} = action;

    unblockedScreens = [
        'Main',
        'SignIn',
        'Property'
    ]
    
    if( type == 'Navigation/NAVIGATE' && !unblockedScreens.includes(routeName) ) {
        return null
    }
    return defaultGetStateForAction(action, state);
}
/*-------------------------------------------------*/

export default Routes;
