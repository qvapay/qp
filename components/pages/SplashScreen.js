import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes';
import { getMe } from '../../utils/QvaPayClient';
import * as Sentry from '@sentry/react-native';

// Theme
import { theme } from '../ui/Theme';

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const verifyToken = async () => {
            let userToken;
            try {
                userToken = await getMe(navigation);
            } catch (error) {
                Sentry.captureException(error);
            } finally {
                if (userToken) {
                    navigation.replace(ROUTES.MAIN_STACK);
                } else {
                    navigation.replace(ROUTES.AUTH_STACK);
                }
            }
        }
        verifyToken();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo-qvapay.png')}
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