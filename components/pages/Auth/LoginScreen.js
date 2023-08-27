import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Image, Platform, ScrollView } from 'react-native';
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
import QPInput from '../../ui/QPInput';
import { OneSignal } from 'react-native-onesignal';
import LottieView from "lottie-react-native";

export default function LoginScreen() {

    const navigation = useNavigation();
    const { setMe } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    // 2FA Form
    const numDigits2FA = 6;
    const [twofactorcode, setTwofactorcode] = useState(0);
    const [showtwofaForm, setShowtwofaForm] = useState(false);

    // Biometric check
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricLoginCredentials, setBiometricLoginCredentials] = useState(false);

    // Check if devica can handle biometric auth
    useEffect(() => {
        FingerprintScanner.isSensorAvailable()
            .then(() => {
                setBiometricAvailable(true);
            })
            .catch(error => {
                // setErrortext(error.message); 
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

    // useEffect for twofactorcode change if it's numDigits2FA length
    useEffect(() => {
        if (twofactorcode.toString().length === numDigits2FA) {
            handleTwoFactor();
        }
    }, [twofactorcode]);

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

                // Suscribe to OneSignal Notifications
                OneSignal.login(data.me.uuid);
                OneSignal.User.addEmail(email);

                // If me.2fa_required is true then show the 2fa form
                if (data.me.two_factor_secret) {
                    await EncryptedStorage.setItem('twoFactorSecret', 'true');
                    setShowtwofaForm(true);
                } else {
                    navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
                }

            } else {
                setLoading(false);
                setErrortext("No es posible iniciar sesión, intente nuevamente");
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            setErrortext("No se ha podido iniciar sesion, intente nuevamente");
            Sentry.captureException(error);
        }
    };

    // Handle 2FA
    const handleTwoFactor = async () => {
        try {
            const response = await checkTwoFactor({ navigation, verifyCode: twofactorcode });
            if (response && response.status === 200) {
                await EncryptedStorage.setItem('twoFactorSecret', 'false');
                navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
            } else {
                setErrortext('El código es incorrecto');
            }
        } catch (error) {
            setErrortext("No se ha podido iniciar sesion, intente nuevamente");
            Sentry.captureException(error);
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 40 }}>
                            <LottieView source={require('../../../assets/lotties/2fa.json')} autoPlay style={styles.lottie} />
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                            <Text style={textStyles.h1}>Código 2FA:</Text>
                        </View>

                        <View style={{ marginVertical: 30 }}>
                            <OtpCode cols={numDigits2FA} setValidatedCode={setTwofactorcode} />
                        </View>

                        {errortext !== '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                    </ScrollView>
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={{ marginHorizontal: 40 }}>
                                <Image source={require('../../../assets/images/auth/login.png')} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                            </View>
                            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                                <Text style={textStyles.h1}>Iniciar sesión:</Text>
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

                                <QPInput
                                    prefixIconName="lock"
                                    placeholder="Contraseña"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={(password) => setPassword(password)}
                                />

                                <Text style={styles.forgotTextStyle} onPress={() => navigation.navigate('RecoverPasswordScreen')}>¿Olvidaste tu contraseña?</Text>

                                {errortext != '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        {errortext}
                                    </Text>
                                ) : null}

                                <QPButton title="Acceder" onPress={handleLoginSubmit} />

                                <View style={styles.biometricIcon}>
                                    {biometricAvailable && <BiometricButton />}
                                </View>
                            </View>

                        </ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.registerTextStyle}>¿No tienes cuenta aún?</Text>
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
    },
    lottie: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
})