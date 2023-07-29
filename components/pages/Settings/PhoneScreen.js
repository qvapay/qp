import React, { useState, useRef, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles, theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../AppContext';
import OtpCode from '../../ui/OtpCode';

export default function PhoneScreen() {

    const { me } = useContext(AppContext);
    const navigation = useNavigation();
    const phoneInput = useRef(null);
    const [phone, setPhone] = useState(me.phone);
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
                    // Show a success message
                    console.log("YEY")
                } else {
                    setErrorMessage('Código Inválido');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
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
        }
    };

    return (
        <View style={globalStyles.container}>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                {
                    otpShow ? (
                        <OtpCode setValidatedCode={setCode} />
                    ) : (
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phone}
                            defaultCode="US"
                            layout="first"
                            onChangeText={(phone) => { setPhone(phone) }}
                            onChangeFormattedText={(text) => { setFormattedValue(text) }}
                            disableArrowIcon={true}
                            withDarkTheme
                            withShadow
                            autoFocus
                            textInputProps={{ selectionColor: 'white', placeholderTextColor: 'gray' }}
                            containerStyle={[styles.inputStyle, { backgroundColor: theme.darkColors.background, paddingVertical: 2, paddingHorizontal: 0 }]}
                            textContainerStyle={{ backgroundColor: theme.darkColors.background, paddingVertical: 0, paddingHorizontal: 0 }}
                            textInputStyle={{ flex: 1, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 18, flexDirection: 'row' }}
                            codeTextStyle={{ paddingVertical: 0, paddingHorizontal: 0, marginHorizontal: 0, color: 'white' }}
                            flagButtonStyle={{ backgroundColor: theme.darkColors.background }}
                            countryPickerButtonStyle={{ backgroundColor: theme.darkColors.background }}
                        />
                    )
                }

                {
                    errorMessage && (
                        <Text style={{ color: theme.darkColors.danger, textAlign: 'center' }}>{errorMessage}</Text>
                    )
                }
            </View>

            <QPButton title={otpShow ? "Verificar OTP" : "Enviar OTP"} onPress={handleOTP} />

        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        fontFamily: "Rubik-Regular",
    },
})