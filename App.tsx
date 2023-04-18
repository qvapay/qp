import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Navigation Stacks
import AuthStack from './components/pages/Auth/AuthStack';
import MainStack from './components/pages/MainScreens/MainStack';

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

// Import AppProvider
import {AppProvider} from './AppContext';

// Stack Navigation
const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <SafeAreaView style={styles.container}>

          <StatusBar
            hidden={false}
            animated={true}
            barStyle={'default'}
            backgroundColor={theme.darkColors?.background}
            showHideTransition={'fade'}
          />

          {/* Navigation COntainer */}
          <NavigationContainer>

            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                title: '',
                headerBackVisible: true,
                headerBackTitleVisible: false,
                headerBackButtonMenuEnabled: false,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: theme.darkColors?.background,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>

              {/* SplashScreen which will come once for 2 Seconds */}
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />

              {/* Auth Navigator: Include Login and Signup */}
              <Stack.Screen
                name="AuthStack"
                component={AuthStack}
                options={{
                  headerShown: false
                }}
              />

              {/* Main Tabs Navigator */}
              <Stack.Screen
                name="MainStack"
                component={MainStack}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="TransactionStack"
                component={TransactionStack}
                options={{
                  headerLeft: () => {
                    return null;
                  },
                  headerRight: () => {
                    return null;
                  },
                }}
              />

              <Stack.Screen
                name="ScanScreen"
                component={ScanScreen}
                options={{
                  title: 'Scan',
                  headerShown: false,
                  animationDuration: 150,
                  animation: 'fade_from_bottom',
                }}
              />

              <Stack.Screen
                name="SendScreen"
                component={SendScreen}
                options={{
                  headerLeft: () => {
                    return null;
                  },
                  headerRight: () => {
                    return null;
                  },
                }}
              />

              <Stack.Screen
                name="ConfirmSendScreen"
                component={ConfirmSendScreen}
                options={{
                  title: 'Confirmar envío',
                  headerLeft: () => {
                    return null;
                  },
                  headerRight: () => {
                    return null;
                  },
                }}
              />

              <Stack.Screen
                name="ReceiveScreen"
                component={ReceiveScreen}
                options={{
                  headerLeft: () => {
                    return null;
                  },
                  headerRight: () => {
                    return null;
                  },
                }}
              />

              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                  title: 'Perfil de usuario',
                  headerShown: false,
                  animationDuration: 150,
                  animation: 'fade_from_bottom',
                }}
              />

              <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                  title: 'Ajustes',
                  headerShown: false,
                  animationDuration: 150,
                  animation: 'fade_from_bottom',
                }}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </AppProvider>
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
