import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles, textStyles, theme } from '../ui/Theme';
import { useNavigation } from '@react-navigation/native';
import QPButton from '../ui/QPButton';
import { AppContext } from '../../AppContext';
import LottieView from "lottie-react-native";

export default function WelcomeScreen() {

    const navigation = useNavigation();
    const { setBackgroundColor } = useContext(AppContext);

    useEffect(() => {
        setBackgroundColor(theme.darkColors?.background);
    }, []);

    return (
        <View style={globalStyles.container}>

            <View style={styles.welcome}>
                <Text style={textStyles.h1}>Bienvenid@ a QvaPay</Text>
                <Text style={globalStyles.subtitle}>La forma más fácil de recibir y enviar dinero.</Text>
                <Text style={globalStyles.subtitle}>Comienza a recibir pagos a nivel mundial. 🌎</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 40 }}>
                <LottieView source={require('../../assets/lotties/welcome1.json')} autoPlay loop style={styles.lottie} />
            </View>

            <View style={styles.accessButtons}>
                <QPButton title="Iniciar Sesión" onPress={() => { navigation.navigate('AuthStack', { screen: 'LoginScreen' }) }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
                <Text style={[styles.registerText, { color: theme.darkColors.contrast_text, marginLeft: 5 }]} onPress={() => { navigation.navigate('AuthStack', { screen: 'RegisterScreen' }) }}>Regístrate</Text>
            </View>
        </View>
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
        color: 'white',
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