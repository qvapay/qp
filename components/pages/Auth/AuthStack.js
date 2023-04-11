import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Main Pages Login/Register
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
// Missing 2FA and Recover password Screen

export default function AuthStack() {

    // Stack Navigation
    const Stack = createNativeStackNavigator();

    // Stack Navigator for Login and Sign up Screen 
    return (
        <Stack.Navigator name="AuthStack" initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
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