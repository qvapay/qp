import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppProvider} from './AppContext';
import {ThemeProvider} from '@rneui/themed';
import {theme, containerStyles} from './components/ui/Theme';
import AppNavigator from './components/AppNavigator';

function App(): JSX.Element {
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
