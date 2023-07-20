import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes';
import { getMe } from '../../utils/QvaPayClient';
import * as Sentry from '@sentry/react-native';
import { theme } from '../ui/Theme';

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const verifyToken = async () => {
            let userToken;
            let navigateTo = ROUTES.AUTH_STACK;
            try {
                userToken = await getMe(navigation);
                if (userToken) {
                    navigateTo = ROUTES.MAIN_STACK;
                }
            } catch (error) {
                Sentry.captureException(error);
            } finally {
                navigation.replace(navigateTo);
            }
        }
        const splashTimeout = setTimeout(verifyToken, 2000);
        return () => clearTimeout(splashTimeout);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/qvapay-cover2.png')}
                style={styles.imageLogo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.darkColors.background,
    },
    imageLogo: {
        width: '50%',
        resizeMode: 'contain',
        margin: 30,
    },
    activityIndicator: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default SplashScreen;