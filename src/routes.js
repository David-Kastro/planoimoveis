import React, {Component} from 'react';

import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { ScrollView, View, Image } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper'

import Loading from '~/pages/Loading';
import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';

const CustomDrawerComponent = (props) => (
    
    <SafeAreaView>
        <View style={{width: '100%', height: 230, backgroundColor: '#E30613', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <Image source={require('../../assets/Planologo.png')} resizeMode="contain" />
        </View>
        <ScrollView style={{marginVertical: 20}}>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const DrawerStack = createDrawerNavigator({
    Main: {
        screen: Main
    }
},{
    contentOptions: {
        activeTintColor: '#E30613',
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

export default Routes;
