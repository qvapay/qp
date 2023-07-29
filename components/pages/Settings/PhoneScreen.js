import React, { useState, useRef, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles, theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../AppContext';
import OtpCode from '../../ui/OtpCode';
import { sendOTP, verifyOTP } from '../../../utils/QvaPayClient';

export default function PhoneScreen() {

    const { me } = useContext(AppContext);
    const navigation = useNavigation();
    const phoneInput = useRef(null);
    const [phone, setPhone] = useState(me.phone);
    const [formattedValue, setFormattedValue] = useState(me.phone);
    const [errorMessage, setErrorMessage] = useState(null);
    const [otpShow, setOtpShow] = useState(false);
    const [code, setCode] = useState('');
    const [boldMessage, setBoldMessage] = useState('Coloca tu número de teléfono celular:')

    console.log(me.phone_verified)

    // useEffect for the main label
    useEffect(() => {
        if (otpShow) {
            setBoldMessage('Coloca el código que te enviamos por SMS:')
        } else {
            setBoldMessage('Coloca tu número de teléfono celular:')
        }
    }, [otpShow])

    // Handle OTP
    const handleOTP = async () => {

        // Verify OTP
        if (otpShow) {

            try {
                const response = await verifyOTP({ navigation, phone: formattedValue, code });
                if (response.status === 201) {
                    // TODO Show congratulations and fulfill the user data
                    console.log("YEY")
                } else {
                    setErrorMessage('Código Inválido');
                }
            } catch (error) {
                setErrorMessage('Código Inválido');
            }

        } else {

            if (phoneInput.current.isValidNumber(phone)) {
                const { formattedNumber } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
                try {
                    const response = await sendOTP({ navigation, phone: formattedNumber });
                    if (response.status === 201) {
                        setOtpShow(true);
                    } else {
                        setErrorMessage('Número de Teléfono Inválido');
                    }
                } catch (error) {
                    setErrorMessage('No se ha poduido enviar el código');
                }
            } else {
                setErrorMessage('Número de Teléfono Inválido');
            }
        }
    };

    return (
        <View style={globalStyles.container}>

            <View style={{ flex: 1 }}>

                {
                    me.phone_verified ? (
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/images/phone-verify.png')}
                                style={{ width: '100%', height: 250, resizeMode: 'contain', marginVertical: 20 }}
                            />
                            <View style={{ paddingHorizontal: 10, marginTop: 30, marginBottom: 10 }}>
                                <Text style={{ fontFamily: 'Rubik-Bold', fontSize: 28, color: 'white', textAlign: 'center' }}>Su número ya está verificado. 👍</Text>
                                <Text style={{ fontFamily: 'Rubik-Reguular', color: theme.darkColors.primary, fontSize: 36, textAlign: 'center' }}>{`${phone}`}</Text>
                            </View>
                        </View>
                    ) : (
                        <>
                            <View style={{ paddingHorizontal: 10, marginTop: 30, marginBottom: 10 }}>
                                <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 16, color: 'white', textAlign: 'left' }}>Vamos a verificarte {`${me.name}`} 🎉</Text>
                                <Text style={{ fontFamily: 'Rubik-Bold', fontSize: 28, color: 'white', textAlign: 'left', }}>{boldMessage}</Text>
                                {
                                    otpShow && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 14, color: 'white', textAlign: 'left', }}>Hacia el número </Text>
                                            <Text style={{ color: theme.darkColors.primary }}>{`${phone}`}</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={{ marginVertical: 20 }}>
                                {
                                    otpShow ? (
                                        <>
                                            <OtpCode setValidatedCode={setCode} />
                                            <View style={{ marginVertical: 10 }}>
                                                <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 16, color: 'white', color: theme.darkColors.primary, textAlign: 'center' }}>Reenviar código</Text>
                                            </View>
                                        </>
                                    ) : (
                                        <PhoneInput
                                            ref={phoneInput}
                                            defaultValue={phone}
                                            defaultCode="US"
                                            layout="first"
                                            onChangeText={(phone) => { setPhone(phone) }}
                                            onChangeFormattedText={(phone) => { setFormattedValue(phone) }}
                                            disableArrowIcon={true}
                                            withDarkTheme
                                            withShadow
                                            autoFocus
                                            textInputProps={{ selectionColor: 'white', placeholderTextColor: 'gray' }}
                                            containerStyle={[styles.inputStyle, { backgroundColor: theme.darkColors.background }]}
                                            textContainerStyle={{ backgroundColor: theme.darkColors.background, paddingVertical: 0, paddingHorizontal: 0 }}
                                            textInputStyle={{ flex: 1, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 20 }}
                                            codeTextStyle={{ paddingVertical: 0, paddingHorizontal: 0, marginHorizontal: 0, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 20 }}
                                            flagButtonStyle={{ backgroundColor: theme.darkColors.background }}
                                            countryPickerButtonStyle={{ backgroundColor: theme.darkColors.background }}
                                        />
                                    )
                                }
                            </View>

                            {
                                errorMessage && (
                                    <Text style={{ color: theme.darkColors.danger, textAlign: 'center' }}>{errorMessage}</Text>
                                )
                            }
                            <QPButton title={otpShow ? "Verificar Código" : "Enviar Código"} onPress={handleOTP} />
                        </>
                    )
                }

            </View>

            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 16, color: theme.darkColors.primary, textAlign: 'center' }}>Reglas del Servicio</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 0,
        fontFamily: "Rubik-Regular",
    },
})