import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import SettingsMenu from './SettingsMenu';
import SettingOption from './SettingOption';
import GoldCheck from './GoldCheck';

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

        </Stack.Navigator>
    )
}