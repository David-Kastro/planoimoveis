import React, {Component} from 'react';

import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper'

import Loading from '~/pages/Loading';
import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';

const CustomDrawerComponent = (props) => (
    
    <SafeAreaView>
        <View style={{width: '100%', height: 230, backgroundColor: '#E30613', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <Avatar.Icon 
              size={100} 
              icon="person"
              color='#737373'
              theme={{
                colors:{
                  primary: 'white',
                }
              }} />

              <Button
                mode='contained'
                style={{marginTop: 20}}
                uppercase={false}
                theme={{
                    colors:{
                        primary: 'white',
                    }
                }}
              >
                  <Text style={{color:'#E30613', fontWeight: '500'}}>Fazer Login</Text>
              </Button>
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
