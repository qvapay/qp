import React, {useContext} from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppProvider, AppContext} from './AppContext';
import {containerStyles} from './components/ui/Theme';
import AppNavigator from './components/AppNavigator';

// Onesiganl push notifications
import OneSignal from 'react-native-onesignal';

// Sentry crash reporting
import * as Sentry from '@sentry/react-native';
Sentry.init({
  dsn: 'https://c09b39b83c90495d9a5e0b9c8e3efb0d@o483954.ingest.sentry.io/4505457463132160',
  tracesSampleRate: 1.0,
});

function App(): JSX.Element {
  
  // OneSignal Initialization
  OneSignal.setAppId('30020a75-2a03-4d6d-a3e0-70efae81c1a8');

  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

function MainApp(): JSX.Element {
  
  const {backgroundColor} = useContext(AppContext);

  // if Android, set the status bar to background color
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(backgroundColor);
  }

  return (
    <SafeAreaView style={{...containerStyles.container, backgroundColor}}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

// export default App;
export default Sentry.wrap(App);
