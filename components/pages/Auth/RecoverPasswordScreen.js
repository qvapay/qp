import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme, textStyles } from '../../ui/Theme';
import Loader from '../../ui/Loader';
import QPButton from '../../ui/QPButton';
import { qvaPayClient } from '../../../utils/QvaPayClient';
import * as Sentry from '@sentry/react-native';
import LottieView from "lottie-react-native";

export default function RecoverPasswordScreen() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errortext, setErrortext] = useState('');

    // Handle Recover Password
    const handleRecoverPassword = async () => {

        setErrortext('');

        // Check for empty fields
        if (!email) {
            alert('Por favor, ingrese su correo, username o teléfono');
            return;
        }

        // Check for a valid email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingrese un correo válido');
            return;
        }

        setLoading(true);

        try {
            const response = await qvaPayClient.post("/auth/recover", { email });
            if (response.data && response.status === 201) {
                setSuccess(true);
                return response.data;
            } else {
                throw new Error("No se pudo iniciar sesión correctamente");
            }
        } catch (error) {
            console.error(error);
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>

            <Loader loading={loading} />

            {
                success ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { textAlign: 'center' }]}>¡Listo!</Text>
                        <Text style={[textStyles.h3, { textAlign: 'center', paddingHorizontal: 10 }]}>Te hemos enviado un correo con las instrucciones para recuperar tu contraseña.</Text>
                    </View>
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={{ marginHorizontal: 40 }}>
                                <LottieView source={require('../../../assets/lotties/forgot.json')} autoPlay loop style={styles.lottie} />
                            </View>

                            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                                <Text style={textStyles.h1}>Recuperar contraseña:</Text>
                            </View>

                            <View style={{ flex: 1 }}>

                                <QPInput
                                    prefixIconName="at"
                                    placeholder="Correo, username o teléfono"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    onChangeText={(email) => setEmail(email)}
                                />

                                <Text style={styles.forgotTextStyle} onPress={() => navigation.navigate('RecoverPasswordScreen')}>¿Olvidaste tu contraseña?</Text>

                                {
                                    errortext != '' ? (
                                        <Text style={styles.errorTextStyle}>
                                            {errortext}
                                        </Text>
                                    ) : null
                                }

                                <QPButton title="Enviar código de recuperación" onPress={handleRecoverPassword} />

                            </View>

                        </ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.registerTextStyle}>¿No tienes cuenta aún?</Text>
                            <Text style={[styles.registerTextStyle, { color: theme.darkColors.contrast_text, marginLeft: 5 }]} onPress={() => navigation.navigate('RegisterScreen')}>Regístrate</Text>
                        </View>
                    </>
                )
            }

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    registerTextStyle: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    lottie: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
})