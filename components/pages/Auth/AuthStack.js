import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../ui/Theme';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import RecoverPasswordScreen from './RecoverPasswordScreen';

import { HeaderBackButton } from '@react-navigation/elements';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function AuthStack() {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
            name="AuthStack"
            initialRouteName="LoginScreen"
            screenOptions={{
                title: '',
                headerTintColor: 'white',
                headerShadowVisible: false,
                animation: 'slide_from_right',
                headerStyle: {
                    backgroundColor: theme.darkColors.background,
                },
                headerLeft: (props) => (
                    <HeaderBackButton
                        {...props}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                ),
            }}
        >

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                }}
            />

            <Stack.Screen
                name="RecoverPasswordScreen"
                component={RecoverPasswordScreen}
                options={{
                }}
            />

            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                }}
            />

        </Stack.Navigator>
    )
}