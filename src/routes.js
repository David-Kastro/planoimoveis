import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Loading from '~/pages/Loading';
import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';

const AppStack  = createStackNavigator({ 
    Main: {
        screen: Main
    }
},{
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

export default Routes;
