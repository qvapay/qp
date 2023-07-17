import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../ui/Theme';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import TwoFactorScreen from './TwofactorScreen';
import RecoverPasswordScreen from './RecoverPasswordScreen';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function AuthStack() {

    return (
        <Stack.Navigator name="AuthStack" initialRouteName="LoginScreen">

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TwoFactorScreen"
                component={TwoFactorScreen}
                options={{
                    headerShown: false,
                    animationDuration: 250,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="RecoverPasswordScreen"
                component={RecoverPasswordScreen}
                options={{
                    headerShown: false,
                    animationDuration: 250,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: theme.darkColors.background,
                    },
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                }}
            />

        </Stack.Navigator>
    )
}