import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { getMe } from '../../utils/QvaPayClient';

// Import routes.js
import { ROUTES } from '../routes'


export default function SplashScreen({ navigation }) {

    useEffect(() => {
        const checkToken = async () => {

            try {
                const checkToken = await getMe(navigation);
            } catch (error) {
                console.log(error)
            }

            if (checkToken !== undefined && checkToken !== null) {
                navigation.replace(ROUTES.MAIN_STACK);
            } else {
                navigation.replace(ROUTES.AUTH_STACK);
            }
        }

        checkToken();
    }, []);

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
        backgroundColor: '#161d31',
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