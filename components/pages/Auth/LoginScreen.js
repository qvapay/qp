import React, { useEffect, useState, createRef, useContext } from 'react';
import { StyleSheet, TextInput, View, Text, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Loader from '../../ui/Loader';
import QPLogo from '../../ui/QPLogo';
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { storeData } from '../../../utils/AsyncStorage';
import { qvaPayClient } from '../../../utils/QvaPayClient';
import EncryptedStorage from 'react-native-encrypted-storage';


export default function LoginScreen({ navigation }) {

    const passwordInputRef = createRef();
    const [email, setEmail] = useState('');
    const { setMe } = useContext(AppContext);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    // Biometric check
    const [errorMessage, setErrorMessage] = useState(null);
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricLoginCredentials, setBiometricLoginCredentials] = useState(false);

    // Check if devica can handle biometric auth
    useEffect(() => {
        FingerprintScanner.isSensorAvailable()
            .then(() => {
                setBiometricAvailable(true);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });

        return () => {
            FingerprintScanner.release();
        };
    }, []);

    // Check if there's a stored email and password
    useEffect(() => {
        const checkStoredCredentialsForBiometricLogin = async () => {
            const email = await EncryptedStorage.getItem('email');
            const password = await EncryptedStorage.getItem('password');
            if (email && password) {
                setBiometricLoginCredentials(true)
            }
        }
        checkStoredCredentialsForBiometricLogin();
    }, []);

    // Login Method from QvaPayClient
    const login = async (email, password) => {
        try {
            const response = await qvaPayClient.post("/auth/login", { email, password });
            if (response.data && response.data.accessToken) {
                return response.data;
            } else {
                throw new Error("No se pudo iniciar sesión correctamente");
            }
        } catch (error) {
            throw error;
        }
    };

    // handle submit form
    const handleLoginSubmit = async () => {

        setErrortext('');
        if (!email) {
            alert('Debe rellenar el usuario');
            return;
        }
        if (!password) {
            alert('Debe rellenar la contraseña');
            return;
        }

        handleLogin(email, password)
    }

    // Handle the login process
    const handleLogin = async (email, password) => {

        console.log(email, password)

        // Set loading and try to login
        setLoading(true);

        try {
            const data = await login(email, password);

            if (data.accessToken && data.me) {

                await EncryptedStorage.setItem('email', email);
                await EncryptedStorage.setItem('password', password);
                await EncryptedStorage.setItem('accessToken', data.accessToken);
                await storeData('me', data.me);

                // Update the user global AppContext state
                setMe(data.me);

                // redirect to main stack
                navigation.replace('MainStack');

            } else {
                setErrortext(data.error);
                console.log('Please check your email id or password');
            }
        } catch (error) {
            setErrortext(error.response.data.error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBiometricLogin = () => {

        FingerprintScanner.authenticate({ title: 'Iniciar sesión con biometría' })
            .then(() => {
                const getStoredCredentials = async () => {
                    const email = await EncryptedStorage.getItem('email');
                    const password = await EncryptedStorage.getItem('password');

                    console.log(email)
                    console.log(password)

                    if (email && password) {
                        setEmail(email);
                        setPassword(password);
                        handleLogin(email, password)
                    }
                }
                getStoredCredentials();
            })
            .catch(error => {
                console.error("Error")
            });
    };

    // Biometric button component as icon
    const BiometricButton = () => {
        return (
            <FontAwesome5
                name="fingerprint"
                size={30}
                color={biometricLoginCredentials ? "#28c76f" : "#4b4b4b"}
                onPress={handleBiometricLogin}
            />
        );
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={[globalStyles.container, { justifyContent: 'center', flex: 1 }]} >

            <Loader loading={loading} />

            <View style={{ alignItems: 'center' }}>
                <QPLogo />
            </View>
            <View style={styles.sectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserEmail) =>
                        setEmail(UserEmail)
                    }
                    placeholder="Usuario, Correo o Teléfono"
                    placeholderTextColor="#7f8c8d"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        passwordInputRef.current &&
                        passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>
            <View style={styles.sectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserPassword) =>
                        setPassword(UserPassword)
                    }
                    placeholder="Contraseña"
                    placeholderTextColor="#7f8c8d"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
            </View>

            {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                    {errortext}
                </Text>
            ) : null}

            <QPButton title="Iniciar Sesión" onPress={handleLoginSubmit} />

            <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                ¿No tienes cuenta? Regístrate
            </Text>

            <Text style={styles.registerTextStyle}>
                {biometricAvailable && <BiometricButton />}
            </Text>

        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    sectionStyle: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderColor: '#283046',
        fontFamily: "Nunito-Regular",
    },
    registerTextStyle: {
        padding: 10,
        fontSize: 14,
        color: '#FFFFFF',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Nunito-Regular",
    },
    errorTextStyle: {
        fontSize: 14,
        color: '#ea5455',
        textAlign: 'center',
        fontFamily: "Nunito-Regular",
    },
})