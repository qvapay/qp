import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Navigation Stacks
import AuthStack from './components/pages/Auth/AuthStack';
import MainStack from './components/pages/MainScreens/MainStack';

// UI Components
import AvatarPicture from './components/ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Screens
import ScanScreen from './components/pages/ScanScreen';
import SplashScreen from './components/pages/SplashScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import SettingsScreen from './components/pages/SettingsScreen';
import SendScreen from './components/pages/InOutOperations/SendScreen';
import ReceiveScreen from './components/pages/InOutOperations/ReceiveScreen';
import TransactionStack from './components/pages/Transactions/TransactionStack';
import ConfirmSendScreen from './components/pages/InOutOperations/ConfirmSendScreen';

// Theming App
import {ThemeProvider} from '@rneui/themed';
import {theme} from './components/ui/Theme';

// Stack Navigation
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <StatusBar
          hidden={false}
          animated={true}
          barStyle={'default'}
          backgroundColor={theme.darkColors?.background}
          showHideTransition={'fade'}
        />

        {/* Navigation COntainer */}
        <NavigationContainer>
          <Stack.Navigator>
            {/* SplashScreen which will come once for 2 Seconds */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkColors?.background,
  },
  qrIconStyle: {
    color: '#fff',
    fontSize: 24,
  },
});

export default App;
