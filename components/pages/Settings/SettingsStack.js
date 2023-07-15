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
import LanguageScreen from './LanguageScreen';
import TwoFactorScreen from './TwoFactorScreen';
import NotificationScreen from './NotificationScreen';
import PaymewntMethodsScreen from './PaymewntMethodsScreen';
import FavoriteContactsScreen from './FavoriteContactsScreen';

// Theme
import { theme } from '../../ui/Theme';

// Import Routes
import { ROUTES } from '../../routes';

const defaultScreenOptions = {
    headerTitleStyle: {
        fontFamily: 'Rubik-Regular',
    },
    headerStyle: {
        backgroundColor: theme.darkColors.background,
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
                    title: '',
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
                name="TwoFactorScreen"
                component={TwoFactorScreen}
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