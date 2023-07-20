import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../../ui/Loader';
import QPLogo from '../../ui/QPLogo';
import QPButton from '../../ui/QPButton';
import { globalStyles, theme } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { checkTwoFactor } from '../../../utils/QvaPayClient';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function TwoFactorScreen({ navigation }) {

    const { me, setMe } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [twofactorcode, setTwofactorcode] = useState('');

    const validateCode = (code) => {
        if (!code.length) return 'El código no puede estar vacío';
        if (code.length !== 6) return 'El código debe tener 6 dígitos';
        if (isNaN(code)) return 'El código debe ser un número';
        return '';
    }

    // Lets create a useEffect to redirect to MainStack for debugging purposes
    useEffect(() => {
        navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
    }, []);

    const handleCodeSubmit = async () => {
        setLoading(true);
        let errorMessage = validateCode(twofactorcode);

        if (!errorMessage) {
            try {
                const response = await checkTwoFactor({ navigation, twofactorcode });

                if (!response || !response.status) {
                    errorMessage = 'Ha ocurrido un error, intente nuevamente';
                } else if (response.status !== 200) {
                    errorMessage = 'El código es incorrecto';
                } else {
                    await EncryptedStorage.setItem('2faRequired', 'false');
                    navigation.reset({ index: 0, routes: [{ name: 'MainStack' }] });
                }
            } catch (error) {
                console.error("Blow try: " + error);
                errorMessage = 'Ha ocurrido un error inesperado, intente nuevamente';
            }
        }

        setErrortext(errorMessage);
        setLoading(false);
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
                    onChangeText={(twofactorcode) => setTwofactorcode(twofactorcode)}
                    placeholder="Código de verificación"
                    placeholderTextColor="#7f8c8d"
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>

            {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                    {errortext}
                </Text>
            ) : null}

            <QPButton title="Verificar Código" onPress={handleCodeSubmit} />

        </KeyboardAwareScrollView>
    )
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
})