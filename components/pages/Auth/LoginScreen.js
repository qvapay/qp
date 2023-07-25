import React, { useRef, useEffect, useState, createRef, useContext } from 'react';
import { StyleSheet, TextInput, View, Text, Keyboard, KeyboardAvoidingView } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../ui/Loader';
import QPLogo from '../../ui/QPLogo';
import QPButton from '../../ui/QPButton';
import { globalStyles, theme } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { storeData } from '../../../utils/AsyncStorage';
import { qvaPayClient, checkTwoFactor } from '../../../utils/QvaPayClient';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';

const CodeInput = React.forwardRef(({ updateValue, nextInput, ...props }, ref) => {
    return (
        <TextInput
            {...props}
            maxLength={1}
            ref={ref}
            style={{ ...styles.inputStyle2FA, width: 40 }}
            keyboardType="numeric"
            onChangeText={(text) => {
                updateValue(text);
                if (text && nextInput) {
                    nextInput.current.focus();
                }
            }}
        />
    );
});

export default function LoginScreen() {

    // get Navigation hook
    const navigation = useNavigation();

    const { me, setMe } = useContext(AppContext);
    const passwordInputRef = createRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [showtwofaForm, setShowtwofaForm] = useState(false);

    // 2FA Form
    const inputsRef = Array(6).fill().map(() => useRef(null));
    const [twofactorcode, setTwofactorcode] = useState(Array(6).fill(''));

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
                    setShowtwofaForm(true);
                } else {
                    navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
                }

            } else {
                setErrortext("Ocurrió un error al iniciar sesion, intente nuevamente");
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
            const verifyCode = twofactorcode.join('')
            const response = await checkTwoFactor({ navigation, verifyCode });
            if (!response || !response.status) {
                errorMessage = 'Ha ocurrido un error, intente nuevamente';
            } else if (response.status !== 200) {
                errorMessage = 'El código es incorrecto';
            }
        } catch (error) {
            setLoading(false);
            setErrortext("No se ha podido iniciar sesion, intente nuevamente");
            Sentry.captureException(error);
        } finally {
            setLoading(false);
            navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <Loader loading={loading} />

            <View style={{ alignItems: 'center' }}>
                <QPLogo />
            </View>

            {
                showtwofaForm ? (
                    <>
                        <View style={styles.sectionStyle}>
                            {twofactorcode.map((digit, index) => (
                                <CodeInput
                                    key={index}
                                    value={digit}
                                    ref={inputsRef[index]}
                                    updateValue={(text) => {
                                        const newCode = [...twofactorcode];
                                        newCode[index] = text;
                                        setTwofactorcode(newCode);
                                    }}
                                    nextInput={inputsRef[index + 1]}
                                />
                            ))}
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

                        <QPButton title="Iniciar Sesión" onPress={handleLoginSubmit} />

                        <Text style={styles.registerTextStyle} onPress={() => navigation.navigate('RegisterScreen')}>
                            ¿No tienes cuenta? Regístrate
                        </Text>

                        <View style={styles.biometricIcon}>
                            {biometricAvailable && <BiometricButton />}
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
        padding: 10,
        fontSize: 14,
        color: '#FFFFFF',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    errorTextStyle: {
        fontSize: 14,
        color: '#ea5455',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    biometricIcon: {
        alignSelf: 'center',
        marginTop: 20,
    }
})