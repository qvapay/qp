import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import GoldCheck from './GoldCheck';
import ThemeScreen from './ThemeScreen';
import SettingsMenu from './SettingsMenu';
import SettingOption from './SettingOption';
import UserdataScreen from './UserdataScreen';
import PasswordScreen from './PasswordScreen';

const defaultScreenOptions = {
    headerTitleStyle: {
        fontFamily: 'Nunito-Regular',
    },
    headerStyle: {
        backgroundColor: '#161d31',
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerShadowVisible: false,
};

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function SettingsStack() {

    return (
        <Stack.Navigator
            name="SettingsStack"
            initialRouteName="SettingsMenu"
            screenOptions={defaultScreenOptions}
        >

            <Stack.Screen
                name="SettingsMenu"
                component={SettingsMenu}
                options={{
                    title: 'Ajustes de su Cuenta',
                }}
            />

            <Stack.Screen
                name="SettingOption"
                component={SettingOption}
                options={{
                    title: 'Ajustes de su Cuenta',
                    animationDuration: 50,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="GoldCheck"
                component={GoldCheck}
                options={{
                    title: '',
                }}
            />

            <Stack.Screen
                name="ThemeScreen"
                component={ThemeScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="UserdataScreen"
                component={UserdataScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="PasswordScreen"
                component={PasswordScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                }}
            />

        </Stack.Navigator>
    )
}