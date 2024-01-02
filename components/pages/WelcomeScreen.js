import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles, textStyles, theme } from '../ui/Theme'
import { useNavigation } from '@react-navigation/native'
import QPButton from '../ui/QPButton'
import { AppContext } from '../../AppContext'
import { ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import DeviceInfo from 'react-native-device-info'

export default function WelcomeScreen() {

    const navigation = useNavigation();
    const { setBackgroundColor } = useContext(AppContext);
    const version = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();

    useEffect(() => {
        setBackgroundColor(theme.darkColors?.background);
    }, []);

    return (
        // TODO create a smooth moving background image
        <ImageBackground source={require('../../assets/images/onboarding/qp-bck.png')} style={{ flex: 1 }}>

            <LinearGradient
                colors={[theme.darkColors.background, 'transparent']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%' }}
            />
            <LinearGradient
                colors={['transparent', theme.darkColors.background]}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%' }}
            />

            <View style={[globalStyles.container, { backgroundColor: null }]}>

                <View style={styles.welcome}>
                    <Text style={textStyles.h1}>Bienvenid@ a QvaPay</Text>
                    <Text style={globalStyles.subtitle}>La forma más fácil de enviar, recibir y pagar.</Text>
                    <Text style={globalStyles.subtitle}>Conecta tu negocio a nivel mundial. 🌎</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}></View>

                <View style={styles.accessButtons}>
                    <QPButton title="Iniciar Sesión" onPress={() => { navigation.navigate('AuthStack', { screen: 'LoginScreen' }) }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
                    <Text style={[styles.registerText, { color: theme.darkColors.contrast_text, marginLeft: 5 }]} onPress={() => { navigation.navigate('AuthStack', { screen: 'RegisterScreen' }) }}>Regístrate</Text>
                </View>

                <Text style={styles.versionText}>{`v ${version} - build ${buildNumber}\n`}</Text>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    welcome: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    accessButtons: {
        marginTop: 20,
    },
    registerText: {
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.almost_white,
    },
    versionText: {
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.almost_white,
    }
})