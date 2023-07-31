import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

// Import Screens
import GoldCheck from './GoldCheck';
import PhoneScreen from './PhoneScreen';
import ThemeScreen from './ThemeScreen';
import SettingsMenu from './SettingsMenu';
import SettingOption from './SettingOption';
import UserdataScreen from './UserdataScreen';
import PasswordScreen from './PasswordScreen';
import LanguageScreen from './LanguageScreen';
import NotificationScreen from './NotificationScreen';
import PaymewntMethodsScreen from './PaymewntMethodsScreen';
import FavoriteContactsScreen from './FavoriteContactsScreen';
import TwoFactorSettingsScreen from './TwoFactorSettingsScreen';

import { theme } from '../../ui/Theme';
import { ROUTES } from '../../routes';

const defaultScreenOptions = {
    headerShown: true,
    headerTitleStyle: {
        fontFamily: 'Rubik-Regular',
    },
    headerStyle: {
        backgroundColor: theme.darkColors.background,
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerShadowVisible: false,
};

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function SettingsStack() {

    const navigation = useNavigation();

    return (
        <Stack.Navigator name="SettingsStack" initialRouteName="SettingsMenu" screenOptions={defaultScreenOptions} >

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
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="GoldCheck"
                component={GoldCheck}
                options={{
                    title: 'Check Dorado',
                    animationDuration: 250,
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
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
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="UserdataScreen"
                component={UserdataScreen}
                options={{
                    title: 'Mi Perfil',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="PhoneScreen"
                component={PhoneScreen}
                options={{
                    title: 'Verificar Celular',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
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
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="TwoFactorSettingsScreen"
                component={TwoFactorSettingsScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="PaymewntMethodsScreen"
                component={PaymewntMethodsScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="FavoriteContactsScreen"
                component={FavoriteContactsScreen}
                options={{
                    title: '',
                    animation: 'slide_from_right',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.navigate(ROUTES.SETTINGS_MENU);
                            }}
                        />
                    ),
                }}
            />

        </Stack.Navigator>
    )
}