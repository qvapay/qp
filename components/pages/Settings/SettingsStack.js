import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

// Import Screens
import GoldCheck from './GoldCheck';
import ThemeScreen from './ThemeScreen';
import SettingsMenu from './SettingsMenu';
import SettingOption from './SettingOption';
import UserdataScreen from './UserdataScreen';
import PasswordScreen from './PasswordScreen';

const defaultScreenOptions = {
    headerTitleStyle: {
        fontFamily: 'Rubik-Regular',
    },
    headerStyle: {
        backgroundColor: '#161d31',
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    headerShown: true,
};

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function SettingsStack() {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
            name="SettingsStack"
            initialRouteName="SettingsMenu"
            screenOptions={defaultScreenOptions}>

            <Stack.Screen
                name="SettingsMenu"
                component={SettingsMenu}
                options={{
                    title: 'Ajustes de su Cuenta',
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
                name="SettingOption"
                component={SettingOption}
                options={{
                    title: 'Ajustes de su Cuenta',
                    animationDuration: 250,
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
                name="GoldCheck"
                component={GoldCheck}
                options={{
                    title: '',
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
                name="ThemeScreen"
                component={ThemeScreen}
                options={{
                    title: '',
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
                name="UserdataScreen"
                component={UserdataScreen}
                options={{
                    title: '',
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
                name="PasswordScreen"
                component={PasswordScreen}
                options={{
                    title: '',
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