import React, {Component} from 'react';

import { View, Image, Dimensions, Animated } from 'react-native';
import { TextInput, ActivityIndicator, TouchableRipple, Button, Card } from 'react-native-paper';
import styled from 'styled-components/native';

const GoogleIcon = ({ size }) => (
    <Image
        source   = { require('../../assets/google.png') }
        style    = {{ width: size, height: size, tintColor: '#DB4A39' }}
    />
)

const SignUpIcon = () => (
    <View style  = {{ width: '100%', height: '100%' }}>
      <Image
        source   = { require('../../assets/add.png') }
        style    = {{ width: 40, height: 40, top: 17, right: 4, tintColor: '#E30613' }}
      /> 
    </View>
)

export const Container = styled.View`
    align-items      : center;
    background-color : #E30613;
    flex             : 1;
`;

export const Logo = styled(Animated.Image).attrs({
    source          : require('../../assets/Planologo.png'),
    resizeMode      : "contain"
})`
    margin-vertical : ${Dimensions.get('window').height * 0.09}px; 
    height          : ${Dimensions.get('window').height * 0.15}px;
    width           : ${Dimensions.get('window').height * 0.15 * (1950 / 662)}px;
    position        : absolute;
`;

export const Form = styled(Card).attrs({
    elevation       : 5,
})`
    width           : ${Dimensions.get('window').width * 0.9}px;
    height          : 350px;
    transform       : translateY(${Dimensions.get('window').height * 0.3}px);
`;

export const Input = styled(TextInput).attrs({
    theme            : {
        colors       : {
            primary  : '#009688',
        }
    },
    dense            : true,
})`
    background-color : transparent;
`;

export const ForgotMyPassword = styled.View`
    flex            : 1;
    flex-direction  : row;
    justify-content : flex-end;
    align-items     : flex-end;
    margin-top      : 25px;
`;

export const ForgotMyPasswordText = styled.Text`
    color           : #797979;
`;

export const ForgotMyPasswordLink = styled(TouchableRipple).attrs({
    rippleColor : "rgba(0, 150, 136, .32)",
})`
    width       : 70px; 
    margin-left : 5px;
`;

export const LoginButton = styled(Button).attrs({
    icon            : "lock",
    mode            : "contained",
    uppercase       : false,
    theme           : {
        colors      : {
            primary : '#E30613',
        }
    },
})`
    margin-vertical : 20px;
    border-radius   : 50px;
`;

export const GoogleButton = styled(Button).attrs( props => ({
    icon            : GoogleIcon,
    mode            : "contained",
    uppercase       : false,
    theme           : {
        colors      : {
            primary : '#FFF',
        }
    },
}))`
    margin-bottom   : 15px;
`;

export const FacebookButton = styled(Button).attrs({
    icon            : require('../../assets/facebook.png'),
    mode            : "contained",
    uppercase       : false,
    theme           : {
        colors      : {
            primary : '#3B5998',
        }
    },
})`
    margin-bottom   : 15px;
`;

export const SignUpCard = styled(Card).attrs({
    elevation      : 6,
})`
    width         : 74px; 
    height        : 74px; 
    border-radius : 37px; 
    position      : absolute; 
    top           : -30px; 
    right         : -15px;
`;

export const SignUpButton = styled(Button).attrs( props => ({
    icon            : SignUpIcon,
    mode            : "contained",
    uppercase       : false,
    theme           : {
        colors      : {
            primary : '#fff',
        }
    },
}))`
    width           : 74px; 
    height          : 74px; 
    border-radius   : 37px;
`;


export const AnimatedView = styled(Animated.View)``;


/**
 ** Adicionando props: 
 * 
 * `background-color: ${props => props.backgroundColor};`
 * 
 ** Container Padding Horizontal: 
 *
 * `PaddingHorizontal: 20` == `padding-horizontal: 20px;`
 *
 ** Status Bar Styling for dark content:

    export const StatusBar = Platform.select({
        ios: styled.StatusBar.attrs({
            barStyle: "dark-content",
        })``,

        android: styled.StatusBar.attrs({
            barStyle        : Platform.Version < 23 ? "light-content" : "dark-content",
            backgroundColor : "transparent",
            translucent     : true,
        })``,
    })

 */