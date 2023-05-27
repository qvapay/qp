import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from './ui/Theme';

// Navigation Stacks
import AuthStack from './pages/Auth/AuthStack';
import MainStack from './pages/MainScreens/MainStack';
import PeerToPeerStack from './pages/P2P/PeerToPeerStack';
import SettingsStack from './pages/Settings/SettingsStack';

// Screens
import ScanScreen from './pages/ScanScreen';
import SplashScreen from './pages/SplashScreen';
import ProfileScreen from './pages/ProfileScreen';
import AddScreen from './pages/DepositWithdraw/AddScreen';
import SendScreen from './pages/InOutOperations/SendScreen';
import ReceiveScreen from './pages/InOutOperations/ReceiveScreen';
import WithdrawScreen from './pages/DepositWithdraw/WithdrawScreen';
import TransactionStack from './pages/Transactions/TransactionStack';
import ConfirmSendScreen from './pages/InOutOperations/ConfirmSendScreen';
import AddInstructionsScreen from './pages/DepositWithdraw/AddInstructionsScreen';
import WithdrawInstructionsScreen from './pages/DepositWithdraw/WithdrawInstructionsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        title: '',
        headerBackVisible: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: false,
        headerStyle: {
          backgroundColor: theme.darkColors?.background,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Nunito-Regular',
        },
        headerTitleAlign: 'center',
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
          headerShown: false,
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

      {/* Transactions Stack */}
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

      {/* P2P Stack */}
      <Stack.Screen name="PeerToPeerStack" component={PeerToPeerStack} />

      {/* Settings Stack */}
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerShown: false,
          animationDuration: 50,
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          title: 'Depositar fondos',
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
          },
        }}
      />

      <Stack.Screen
        name="AddInstructionsScreen"
        component={AddInstructionsScreen}
        options={{
          title: 'Finalizar depósito',
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
          },
        }}
      />

      <Stack.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
        options={{
          title: 'Extraer fondos',
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
          },
        }}
      />

      <Stack.Screen
        name="WithdrawInstructionsScreen"
        component={WithdrawInstructionsScreen}
        options={{
          title: 'Finalizar extracción',
          headerTitleStyle: {
            fontFamily: 'Nunito-Regular',
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
    </Stack.Navigator>
  );
}
