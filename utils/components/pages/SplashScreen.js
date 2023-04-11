import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage';
import { getMe } from '../../utils/QvaPayClient';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            // Create a async function to check if the token is valid
            const checkToken = async () => {

                const accessToken = await EncryptedStorage.getItem("accessToken");

                // Check Token Via QvaPayClient getMe
                try {
                    const checkToken = await getMe(navigation);
                } catch (error) {
                    console.log(error)
                }

                // If accessToken is not null and not undefined, redirect to MainStack
                if (accessToken !== undefined && accessToken !== null && checkToken !== undefined && checkToken !== null) {
                    navigation.replace('MainStack');
                } else {
                    // If accessToken is null or undefined, redirect to AuthStack
                    navigation.replace('AuthStack');
                }
            }
            checkToken();
        }, 3000);
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