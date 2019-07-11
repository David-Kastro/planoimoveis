import React, {Component} from 'react';

import '~/config/ReactotronConfig';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Provider as StoreProvider} from 'react-redux';

import store from './store';

import Routes from '~/routes';

const theme = {
  ...DefaultTheme,
  // dark: ,            // (boolean) whether this is a dark theme or light theme.
  // roundness: ,       // (number) roundness of common elements, such as buttons.
  colors: {
    ...DefaultTheme.colors,
    // primary: '#ff1212',// primary color for your app, usually your brand color.
    // accent: '#f2f2f2', // secondary color for your app which complements the primary color.
    // background: ,      // background color for pages, such as lists.
    // surface: ,         // background color for elements containing content, such as cards.
    // text: ,            // text color for content.
    // disabled: ,        // color for disabled elements.
    // placeholder: ,     // color for placeholder text, such as input placeholder.
    // backdrop: ,        // color for backdrops of various components such as modals.
  },
  fonts: {
    ...DefaultTheme.fonts,
    // regular: ,
    // medium: ,
    // light: ,
    // thin: ,
  }
};

export default class App extends Component {

  render() {
    return(
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </StoreProvider>
    )
  }
};