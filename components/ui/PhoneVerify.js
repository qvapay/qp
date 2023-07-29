import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from './Theme';
import QPButton from './QPButton';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from "react-native-phone-number-input";
import { sendOTP, verifyOTP } from '../../utils/QvaPayClient';
import OtpCode from './OtpCode';

export default function PhoneVerify({ userphone }) {

    const navigation = useNavigation();
    const phoneInput = useRef(null);
    const [phone, setPhone] = useState(phone);
    const [formattedValue, setFormattedValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [otpShow, setOtpShow] = useState(false);
    const [code, setCode] = useState('');

    // Handle OTP
    const handleOTP = async () => {

        console.log("handleOTP")

        // Verify OTP
        if (otpShow) {
            try {
                const response = await verifyOTP({ navigation, phone: formattedValue, code });
                if (response.status === 200) {
                    // Dismiss the modal and refresh the user data
                    navigation.goBack();
                } else {
                    setErrorMessage('Código Inválido');
                }
            } catch (error) {
                console.log(error);
            }
            return;
        }

        // Send OTP
        if (phoneInput.current.isValidNumber(phone)) {
            const { formattedNumber } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
            try {
                const response = await sendOTP({ navigation, phone: formattedNumber });
                if (response.status === 200) {
                    setOtpShow(true);
                } else {
                    setErrorMessage('Número de Teléfono Inválido');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrorMessage('Número de Teléfono Inválido');
        }
    };

    return (
        <View style={{ backgroundColor: theme.darkColors.elevation, paddingTop: 20, paddingBottom: 10, borderRadius: 10 }}>
            <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 16, color: 'white', textAlign: 'center' }}>Verificar Número de Teléfono:</Text>
            <View style={{ flex: 1,marginVertical: 20 }}>
                {
                    otpShow ? (
                        <View>
                            <OtpCode cols={6} setValidatedCode={setCode} />
                        </View>
                    ) : (
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phone}
                            defaultCode="US"
                            layout="first"
                            onChangeText={(phone) => { setPhone(phone) }}
                            onChangeFormattedText={(text) => { setFormattedValue(text) }}
                            disableArrowIcon={true}
                            withDarkTheme={true}
                            withShadow={false}
                            textInputProps={{ selectionColor: 'white', placeholderTextColor: 'gray' }}
                            containerStyle={[styles.inputStyle, { backgroundColor: theme.darkColors.background, paddingVertical: 2, paddingHorizontal: 0 }]}
                            textContainerStyle={{ backgroundColor: theme.darkColors.background, paddingVertical: 0, paddingHorizontal: 0 }}
                            textInputStyle={{ flex: 1, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 18, }}
                            codeTextStyle={{ paddingVertical: 0, paddingHorizontal: 0, marginHorizontal: 0, color: 'white' }}
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

            <QPButton title={otpShow ? "Verificar OTP" : "Enviar OTP"} onPress={handleOTP} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        fontFamily: "Rubik-Regular",
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        color: 'white',
        borderColor: 'white',
    },
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
})