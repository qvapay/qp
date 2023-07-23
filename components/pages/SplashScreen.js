import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes';
import { getMe } from '../../utils/QvaPayClient';
import * as Sentry from '@sentry/react-native';
import { globalStyles, theme } from '../ui/Theme';

const WAITING_TIME = 1000;

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
        verifyToken();
    }, []);

    return (
        <View style={globalStyles.container}>
            <Image source={require('../../assets/images/qvapay-cover2.png')} style={styles.imageLogo} />
            {isLoading && <ActivityIndicator color={theme.darkColors.success} size="small" />}
        </View>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
})

export default SplashScreen;