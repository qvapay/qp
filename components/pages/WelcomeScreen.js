import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import { globalStyles, theme } from '../ui/Theme';
import QPButton from '../ui/QPButton';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

    const navigation = useNavigation();

    // Set the status bar to light
    useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(theme.darkColors.background);
        }
    }, []);

    return (
        <View style={globalStyles.container}>
            <View style={styles.welcome}>
                <Image source={require('../../assets/images/qvapay-cover2.png')} style={styles.imageLogo} />
                <Text style={globalStyles.title}>Bienvenido a QvaPay</Text>
                <Text style={globalStyles.subtitle}>La forma más fácil de recibir y enviar dinero</Text>
            </View>
            <View style={styles.accessButtons}>
                <QPButton
                    title="Iniciar Sesión"
                    onPress={() => {
                        navigation.navigate('AuthStack', {
                            screen: 'LoginScreen'
                        })
                    }}
                />
                <QPButton
                    title="Registrarse"
                    onPress={() => {
                        navigation.navigate('AuthStack', {
                            screen: 'RegisterScreen'
                        })
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    accessButtons: {
        marginTop: 20,
    },
})