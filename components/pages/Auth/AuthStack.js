import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import TwoFactorScreen from './TwofactorScreen';

// TODO 2FA Screen

// TODO Recover Password Screen

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
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: '#161d31',
                    },
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                }}
            />

        </Stack.Navigator>
    )
}