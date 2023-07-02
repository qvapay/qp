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

  /************************ TEMP PERMISION REQUEST */
  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });
  /************************ TEMP PERMISION REQUEST */

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
