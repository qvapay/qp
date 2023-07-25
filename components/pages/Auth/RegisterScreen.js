import React, { useState, createRef } from 'react';
import { StyleSheet, TextInput, View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import QPLogo from '../../ui/QPLogo';
import Loader from '../../ui/Loader';
import QPButton from '../../ui/QPButton';
import { globalStyles, theme } from '../../ui/Theme';
import { qvaPayClient } from '../../../utils/QvaPayClient';

export default function RegisterScreen({ navigation }) {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [agree, setAgree] = useState(false);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    // Form Validation
    const validateFields = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return false;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return false;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return false;
        }
        if (userPassword.length < 6) {
            alert('Please fill Password with at least 6 characters');
            return false;
        }
        if (!agree) {
            alert('Please agree to the terms and conditions');
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

            {isRegistraionSuccess ? (
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <QPLogo />
                    </View>
                    <Text style={styles.successTextStyle}>
                        Registro satisfactorio.
                    </Text>
                    <Text style={styles.successTextStyle}>
                        Por favor, verifique su cuenta mediante el correo recibido para comenzar a usar QvaPay.
                    </Text>
                    <QPButton title="Acceder" onPress={() => navigation.navigate('LoginScreen')} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>

                    <View style={{ alignItems: 'center' }}>
                        <QPLogo />
                    </View>

                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="Nombre"
                            placeholderTextColor="#7f8c8d"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            underlineColorAndroid="#f000"
                            placeholder="Email"
                            placeholderTextColor="#7f8c8d"
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
                    </View>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Contraseña"
                            autoCapitalize="none"
                            placeholderTextColor="#7f8c8d"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                ageInputRef.current &&
                                ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>

                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}

                    <View style={styles.checkBox}>
                        <BouncyCheckbox
                            size={20}
                            fillColor={theme.darkColors.primary}
                            unfillColor={theme.darkColors.background}
                            text="Al registrarme, acepto los Términos de Servicio y la Política de Privacidad."
                            iconStyle={{ borderColor: theme.darkColors.primary }}
                            innerIconStyle={{ borderWidth: 1 }}
                            textStyle={{
                                fontFamily: "Rubik-Regular",
                                textDecorationLine: 'none'
                            }}
                            onPress={(isChecked) => {
                                console.log(isChecked)
                                setAgree(isChecked)
                            }}
                        />
                    </View>

                    <QPButton title="Registrarme" onPress={handleRegister} disabled={!agree} />

                </ScrollView>
            )}

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
    registerTextStyle: {
        flex: 1,
        fontSize: 14,
        marginTop: 10,
        color: '#FFFFFF',
        fontFamily: "Rubik-Regular",
    },
    checkBox: {
        marginVertical: 10,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
})