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
                headerShadowVisible: false,
            }}
        >

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: theme.darkColors.background,
                    },
                    animationDuration: 250,
                    headerTintColor: 'white',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    ),
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
                    animationDuration: 250,
                    headerTintColor: 'white',
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    ),
                }}
            />

        </Stack.Navigator>
    )
}