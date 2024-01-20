import React, {useContext} from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider, AppContext} from './AppContext';
import {containerStyles} from './components/ui/Theme';
import AppNavigator from './components/AppNavigator';

// Onesiganl push notifications
import {OneSignal} from 'react-native-onesignal';

// Sentry crash reporting
import * as Sentry from '@sentry/react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
Sentry.init({
  dsn: 'https://c09b39b83c90495d9a5e0b9c8e3efb0d@o483954.ingest.sentry.io/4505457463132160',
  tracesSampleRate: 0.3,
});

function App(): React.JSX.Element {
  OneSignal.initialize('30020a75-2a03-4d6d-a3e0-70efae81c1a8');
  OneSignal.User.setLanguage('es');
  OneSignal.Location.setShared(false); // TODO: Enable location sharing for mkt purposes in a future

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

function MainApp(): React.JSX.Element {
  const {backgroundColor} = useContext(AppContext);

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

export default Sentry.wrap(App);
