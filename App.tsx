import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppProvider} from './AppContext';
import {ThemeProvider} from '@rneui/themed';
import {theme, containerStyles} from './components/ui/Theme';
import AppNavigator from './components/AppNavigator';

import OneSignal from 'react-native-onesignal';

function App(): JSX.Element {

  // OneSignal Initialization
  OneSignal.setAppId('30020a75-2a03-4d6d-a3e0-70efae81c1a8');

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <SafeAreaView style={containerStyles.container}>
          <StatusBar
            hidden={false}
            animated={true}
            barStyle={'default'}
            backgroundColor={theme.darkColors?.background}
            showHideTransition={'fade'}
          />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
