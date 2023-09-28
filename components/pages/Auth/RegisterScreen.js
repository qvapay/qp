import React, { useState, createRef } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import QPLogo from '../../ui/QPLogo';
import Loader from '../../ui/Loader';
import QPButton from '../../ui/QPButton';
import { globalStyles, theme, textStyles } from '../../ui/Theme';
import { qvaPayClient } from '../../../utils/QvaPayClient';
import QPInput from '../../ui/QPInput';

export default function RegisterScreen({ navigation }) {

    const [agree, setAgree] = useState(false);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [errortext, setErrortext] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    // Form Validation
    const validateFields = () => {

        setErrortext('');

        if (!userName) {
            alert('Por favor rellene su nombre');
            return false;
        }

        if (!userEmail) {
            alert('Por favor rellene su correo electrónico');
            return false;
        }

        if (!userPassword) {
            alert('Por favor rellene su contraseña');
            return false;
        }

        // Only allow one name on the name field
        if (userName.split(' ').length > 1) {
            alert('Por favor un solo nombre');
            return false;
        }

        if (userPassword.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        if (!agree) {
            alert('Por favor acepte los términos y condiciones');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {

        if (!validateFields()) { return }

        setLoading(true);

        const dataToSend = {
            name: userName,
            email: userEmail,
            password: userPassword,
            c_password: userPassword,
            invite: '',
        };

        try {
            const response = await qvaPayClient.post('/auth/register', dataToSend);
            if (response.status === 201 && response.data.accessToken) {
                setIsRegistraionSuccess(true);
            } else {
                setErrortext(response.msg);
                throw new Error("No se pudo registrar correctamente");
            }
        } catch (error) {
            setErrortext(error.response.data.error ? error.message : "Ha ocurrido un error");
            console.log(error)
            console.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <Loader loading={loading} />

            {
                isRegistraionSuccess ? (
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ alignItems: 'center' }}><QPLogo /></View>
                            <Text style={[textStyles.h1, { textAlign: 'center' }]}>¡Registro satisfactorio!</Text>
                            <Text style={[textStyles.h6, { textAlign: 'center' }]}>Por favor, verifique su cuenta mediante el correo recibido para comenzar a usar QvaPay.</Text>
                        </View>
                        <QPButton title="Acceder" onPress={() => navigation.navigate('LoginScreen')} />
                    </>
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View>
                                <Image source={require('../../../assets/images/auth/register.png')} style={{ width: '100%', height: 180, resizeMode: 'contain' }} />
                                <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
                                    <Text style={textStyles.h1}>Registra tu cuenta:</Text>
                                </View>
                            </View>

                            <QPInput
                                prefixIconName="user"
                                placeholder="Nombre"
                                onChangeText={(name) => setUserName(name)}
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />

                            <QPInput
                                prefixIconName="at"
                                placeholder="Email"
                                onChangeText={(email) => setUserEmail(email)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                ref={emailInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />

                            <QPInput
                                prefixIconName="lock"
                                suffixIconName="eye-slash"
                                placeholder="Contraseña"
                                onChangeText={(password) => setUserPassword(password)}
                                secureTextEntry={true}
                                ref={passwordInputRef}
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />

                            {
                                errortext != '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        {errortext}
                                    </Text>
                                ) : null
                            }

                            <View style={styles.checkBox}>
                                <BouncyCheckbox
                                    size={20}
                                    fillColor={theme.darkColors.primary}
                                    unfillColor={theme.darkColors.background}
                                    text="Al registrarme, acepto los Términos de Servicio y la Política de Privacidad."
                                    iconStyle={{ borderColor: theme.darkColors.primary }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    textStyle={{ fontFamily: "Rubik-Regular", textDecorationLine: 'none' }}
                                    onPress={(isChecked) => { setAgree(isChecked) }}
                                />
                            </View>

                            <QPButton title="Registrarme" onPress={handleRegister} disabled={!agree} />

                        </ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.loginTextStyle}>¿Ya tienes cuenta?</Text>
                            <Text style={[styles.loginTextStyle, { color: theme.darkColors.contrast_text, marginLeft: 5 }]} onPress={() => navigation.navigate('LoginScreen')}>Iniciar Sesión</Text>
                        </View>
                    </>
                )
            }

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    sectionStyle: {
        height: 50,
        marginVertical: 5,
        flexDirection: 'row'
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: theme.darkColors.elevation,
        fontFamily: "Rubik-Regular",
    },
    errorTextStyle: {
        fontSize: 14,
        color: '#ea5455',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    successTextStyle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    loginTextStyle: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    checkBox: {
        paddingLeft: 10,
        marginRight: 100,
        marginVertical: 10,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
})