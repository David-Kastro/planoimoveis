import React, {Component} from 'react';

import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { ScrollView, View, Image } from 'react-native';
import { Avatar, Button, Text, TouchableRipple } from 'react-native-paper'

import Loading from '~/pages/Loading';
import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';
import Schedule from '~/pages/Schedule';
import Notification from '~/pages/Notification';

const CustomDrawerComponent = (props) => (
    
    <SafeAreaView>
        <View style={{width: '100%', height: 220, backgroundColor: '#E30613'}}>
            <View style={{width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                <Image source={require('./assets/Planologo.png')} resizeMode="contain" style={{height: 75, marginTop: 20}} />
            </View>

            <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableRipple
                    onPress={() => console.log(props)}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Text style={{marginVertical: 5, marginHorizontal: 10, color: 'rgba(255,255,255,0.9)', fontSize: 18}}>Fazer Login</Text>
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

},{
    contentOptions: {
        activeTintColor: '#E30613',
        labelStyle: {fontSize: 20, fontWeight: 'normal'}
    },
    drawerPosition: "right",
    contentComponent: CustomDrawerComponent
});

const AppStack  = createStackNavigator({ 
    DrawerStack
},{
    initialRouteName: 'DrawerStack',
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
    initialRouteName: 'AppStack',
}));

/*-------------- Temporário -----------------------*/
const defaultGetStateForAction = Routes.router.getStateForAction;
Routes.router.getStateForAction = (action, state) => {
    const {type} = action;
    if( type == 'Navigation/NAVIGATE' ) {
        return null
    }
    return defaultGetStateForAction(action, state);
}
/*-------------------------------------------------*/

export default Routes;
