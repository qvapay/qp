import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles, textStyles, theme } from '../ui/Theme';
import { useNavigation } from '@react-navigation/native';
import QPButton from '../ui/QPButton';
import { AppContext } from '../../AppContext';
import LottieView from "lottie-react-native";
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



export default function WelcomeScreen() {

    const navigation = useNavigation();
    const { setBackgroundColor } = useContext(AppContext);

    useEffect(() => {
        setBackgroundColor(theme.darkColors?.background);
    }, []);

    // TODO create a smooth moving background image

    return (
        <ImageBackground source={require('../../assets/images/onboarding/qp-bck.png')} style={{ flex: 1 }}>

            <LinearGradient
                colors={['rgba(0,0,0,1)', 'transparent']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%' }}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '33%' }}
            />

            <View style={[globalStyles.container, { backgroundColor: null }]}>

                <View style={styles.welcome}>
                    <Text style={textStyles.h1}>Bienvenid@ a QvaPay</Text>
                    <Text style={globalStyles.subtitle}>La forma más fácil de enviar, recibir y pagar.</Text>
                    <Text style={globalStyles.subtitle}>Contecta tu negocio a nivel mundial. 🌎</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}></View>

                <View style={styles.accessButtons}>
                    <QPButton title="Iniciar Sesión" onPress={() => { navigation.navigate('AuthStack', { screen: 'LoginScreen' }) }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
                    <Text style={[styles.registerText, { color: theme.darkColors.contrast_text, marginLeft: 5 }]} onPress={() => { navigation.navigate('AuthStack', { screen: 'RegisterScreen' }) }}>Regístrate</Text>
                </View>

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
    imageLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    accessButtons: {
        marginTop: 20,
    },
    registerText: {
        color: theme.darkColors.almost_white,
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
    },
    lottie: {
        height: 250,
        width: '100%',
        alignSelf: 'center',
    },
})