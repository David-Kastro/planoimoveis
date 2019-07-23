import React, {Component} from 'react';

import { View } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
    align-items      : center;
    background-color : #E30613;
    flex             : 1;
`;


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