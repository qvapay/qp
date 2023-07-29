import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes';
import { getMe } from '../../utils/QvaPayClient';
import * as Sentry from '@sentry/react-native';
import { theme } from '../ui/Theme';

const WAITING_TIME = 2000;

const SplashScreen = () => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            let userToken;
            let navigateTo = ROUTES.WELCOME_SCREEN;
            setIsLoading(true);
            try {
                const [tokenResponse] = await Promise.all([
                    getMe(navigation),
                    new Promise(resolve => setTimeout(resolve, WAITING_TIME))
                ]);
                userToken = tokenResponse;
                if (userToken) {
                    navigateTo = ROUTES.MAIN_STACK;
                }
            } catch (error) {
                Sentry.captureException(error);
            } finally {
                setIsLoading(false);
                navigation.replace(navigateTo);
            }
        }

        // Set the status bar to light
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(theme.darkColors.primary);
        }

        verifyToken();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/qvapay-logo-white.png')} style={styles.imageLogo} />
            {isLoading && <ActivityIndicator color={theme.darkColors.background} size="small" />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: theme.darkColors.primary,
    },
    imageLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
})

export default SplashScreen;