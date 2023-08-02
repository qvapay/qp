import React, { useRef, useEffect, useState, createRef, useContext } from 'react';
import { StyleSheet, TextInput, View, Text, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../ui/Loader';
import QPButton from '../../ui/QPButton';
import { globalStyles, theme, textStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { storeData } from '../../../utils/AsyncStorage';
import { qvaPayClient, checkTwoFactor } from '../../../utils/QvaPayClient';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import OtpCode from '../../ui/OtpCode';

export default function LoginScreen() {

    // get Navigation hook
    const navigation = useNavigation();
    const { me, setMe } = useContext(AppContext);
    const passwordInputRef = createRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    // 2FA Form
    const [twofactorcode, setTwofactorcode] = useState(0);
    const [showtwofaForm, setShowtwofaForm] = useState(false);

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
            Sentry.captureException(error);
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
        setLoading(true);
        try {
            const data = await login(email, password);
            if (data && data.accessToken && data.me) {

                await EncryptedStorage.setItem('email', email);
                await EncryptedStorage.setItem('password', password);
                await EncryptedStorage.setItem('accessToken', data.accessToken);
                await storeData('me', data.me);

                // Update the user global AppContext state
                setMe(data.me);
                setLoading(false);

                // If me.2fa_required is true then show the 2fa form
                if (data.me.two_factor_secret) {
                    await EncryptedStorage.setItem('twoFactorSecret', 'true');
                    console.log("Set 2FA to True")
                    setShowtwofaForm(true);
                } else {
                    navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
                }

            } else {
                setErrortext("No es posible iniciar sesión, intente nuevamente");
            }

        } catch (error) {
            setLoading(false);
            setErrortext("No se ha podido iniciar sesion, intente nuevamente");
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle 2FA
    const handleTwoFactor = async () => {
        setLoading(true);
        try {
            const response = await checkTwoFactor({ navigation, verifyCode: twofactorcode });
            if (response && response.status == 200) {
                await EncryptedStorage.setItem('twoFactorSecret', 'false');
                console.log("Set 2FA to False")
                navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
            } else {
                errorMessage = 'El código es incorrecto';
            }
        } catch (error) {
            setLoading(false);
            setErrortext("No se ha podido iniciar sesion, intente nuevamente");
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }
    }

    const handleBiometricLogin = () => {
        FingerprintScanner.authenticate({ title: 'Iniciar sesión con biometría' })
            .then(() => {
                const getStoredCredentials = async () => {
                    const email = await EncryptedStorage.getItem('email');
                    const password = await EncryptedStorage.getItem('password');
                    if (email && password) {
                        setEmail(email);
                        setPassword(password);
                        handleLogin(email, password)
                    }
                }
                getStoredCredentials();
            })
            .catch(error => {
                console.error(error)
            });
    };

    // Biometric button component as icon
    const BiometricButton = () => {
        return (
            <FontAwesome5
                name="fingerprint"
                size={30}
                color={biometricLoginCredentials ? theme.darkColors.success : "#4b4b4b"}
                onPress={handleBiometricLogin}
            />
        );
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>

            <Loader loading={loading} />

            {
                showtwofaForm ? (
                    <>
                        <View style={{ marginHorizontal: 40 }}>
                            <Image
                                source={require('../../../assets/images/auth/twofactor.png')}
                                style={{ width: '100%', height: 250, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                            <Text style={textStyles.h1}>Código 2FA:</Text>
                        </View>

                        <View style={{ marginVertical: 30 }}>
                            <OtpCode setValidatedCode={setTwofactorcode} />
                        </View>

                        {errortext !== '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <QPButton title="Comprobar código" onPress={handleTwoFactor} />
                    </>
                ) : (
                    <>
                        <View style={{ marginHorizontal: 40 }}>
                            <Image
                                source={require('../../../assets/images/auth/login.png')}
                                style={{ width: '100%', height: 250, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                            <Text style={textStyles.h1}>Iniciar Sesión:</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    autoComplete="email"
                                    style={styles.inputStyle}
                                    onChangeText={(UserEmail) => setEmail(UserEmail)}
                                    placeholder="Correo, username o teléfono"
                                    placeholderTextColor="#7f8c8d"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(UserPassword) => setPassword(UserPassword)}
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

                            {/* <Text style={styles.forgotTextStyle} onPress={() => navigation.navigate('RecoverPasswordScreen')}>¿Olvidaste tu contraseña?</Text> */}

                            <QPButton title="Acceder" onPress={handleLoginSubmit} />

                            <View style={styles.biometricIcon}>
                                {biometricAvailable && <BiometricButton />}
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.registerTextStyle}>¿No tienes cuenta?</Text>
                            <Text style={[styles.registerTextStyle, { color: theme.darkColors.primary, marginLeft: 5 }]} onPress={() => navigation.navigate('RegisterScreen')}>Regístrate</Text>
                        </View>
                    </>
                )
            }

        </KeyboardAvoidingView>
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
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: theme.darkColors.elevation,
        fontFamily: "Rubik-Regular",
    },
    inputStyle2FA: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: theme.darkColors.elevation,
        fontFamily: "Rubik-Regular",
    },
    registerTextStyle: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    forgotTextStyle: {
        fontSize: 14,
        color: theme.darkColors.primary,
        marginVertical: 10,
        textAlign: 'right',
        fontFamily: "Rubik-Regular",
    },
    errorTextStyle: {
        fontSize: 14,
        color: theme.darkColors.danger,
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    biometricIcon: {
        alignSelf: 'center',
        marginTop: 20,
    }
})