import React, {Component} from 'react';

import { View, Image, Dimensions, Animated } from 'react-native';
import { TextInput, ActivityIndicator, TouchableRipple, Button, Card, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';

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
    background-color : rgba(227, 6, 19, 0.6);
    paddingTop       : 20;
    flex             : 1;
`;

export const ArrowBack = styled(Animated.View)`
    marginTop       : 40; 
    left            : 10;
    position        : absolute;
`;

export const ArrowBackIcon = styled(IconButton).attrs({
    icon            : "arrow-back",
    color           : "white",
    size            : 40
})` 
    width           : 50;
`;

export const Logo = styled(Animated.Image).attrs({
    source          : require('../../assets/Planologo.png'),
    resizeMode      : "contain"
})`
    marginTop       : ${Dimensions.get('window').height * 0.09}; 
    height          : ${Dimensions.get('window').height * 0.15}px;
    width           : ${Dimensions.get('window').height * 0.15 * (1950 / 662)}px;
    position        : absolute;
`;

export const Banner = styled(Animated.View)`
    position        : absolute;
    flexDirection   : column;
    justifyContent  : center;
    alignItems      : center;
    marginTop       : ${Dimensions.get('window').height * 0.32};
`;

export const BannerHeader = styled.Text`
    fontSize        : 22;
    fontWeight      : bold;
    color           : 'rgba(255,255,255,1)';
`;

export const BannerText = styled.Text`
    fontSize        : 18;
    marginTop       : 10;
    color           : 'rgba(255,255,255,0.8)';
`;

export const Form = styled(Card).attrs({
    elevation       : 5,
})`
    width           : ${Dimensions.get('window').width * 0.95}px;
    height          : 250px;
    transform       : translateY(${Dimensions.get('window').height * 0.5}px);
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

export const LoginButton = styled(TouchableRipple).attrs({
    rippleColor : "rgba(255, 255, 255, 1)",
})`
    width           : 100%;
    height          : 50px;
    background-color : rgba(227, 6, 19, 0.8);
    flexDirection   : row;
    justifyContent  : center;
    alignItems      : center;
    marginTop       : 20;
`;

export const LoginButtonContent = styled.View`
    width           : 100%;
    alignItems      : center;
`;

export const LoginButtonText = styled.Text`
    fontSize        : 20;
    color           : white;
`;

export const Loading = styled(ActivityIndicator).attrs({
    animating       : true, 
    color           :"white" 
})``;

export const SignUpCard = styled(Card).attrs({
    elevation      : 6,
})`
    width         : 74px; 
    height        : 74px; 
    border-radius : 37px; 
    position      : absolute; 
    top           : -40px;
    left          : ${(Dimensions.get('window').width * 0.95 * 0.5) - 37};
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