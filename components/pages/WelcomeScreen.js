import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles, textStyles, theme } from '../ui/Theme';
import { useNavigation } from '@react-navigation/native';
import QPButton from '../ui/QPButton';
import { AppContext } from '../../AppContext';

export default function WelcomeScreen() {

    const navigation = useNavigation();
    const { setBackgroundColor } = useContext(AppContext);

    useEffect(() => {
        setBackgroundColor(theme.darkColors?.background);
    }, []);

    return (
        <View style={globalStyles.container}>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image source={require('../../assets/images/qvapay-cover2.png')} style={styles.imageLogo} />
            </View>

            <View style={styles.welcome}>
                <Text style={textStyles.h1}>Bienvenid@ a QvaPay</Text>
                <Text style={globalStyles.subtitle}>La forma más fácil de recibir y enviar dinero.</Text>
                <Text style={globalStyles.subtitle}>Comienza a recibir pagos a nivel mundial. 🌎</Text>
            </View>

            <View style={styles.accessButtons}>
                <QPButton title="Iniciar Sesión" onPress={() => { navigation.navigate('AuthStack', { screen: 'LoginScreen' }) }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.registerText}>¿No tienes cuenta aún?</Text>
                <Text style={[styles.registerText, { color: theme.darkColors.primary, marginLeft: 5 }]} onPress={() => { navigation.navigate('AuthStack', { screen: 'RegisterScreen' }) }}>Regístrate</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
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
    registerText: {
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
    }
})