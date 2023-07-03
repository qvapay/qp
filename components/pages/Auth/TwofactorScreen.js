import React, { useState, useContext } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Loader from '../../ui/Loader';
import QPLogo from '../../ui/QPLogo';
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { storeData } from '../../../utils/AsyncStorage';
import { checkTwoFactor } from '../../../utils/QvaPayClient';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function TwoFactorScreen({ route, navigation }) {

    const { setMe } = useContext(AppContext);
    const { accessToken, me } = route.params;
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [twofactorcode, setTwofactorcode] = useState('');

    console.log(me)

    const handleCodeSubmit = async () => {

        setLoading(true);

        // Try
        try {
            // Check if code is empty
            if (twofactorcode.length === 0) {
                setLoading(false);
                setErrortext('El código no puede estar vacío');
                return;
            }

            // Check if code is 6 digits long
            if (twofactorcode.length !== 6) {
                setLoading(false);
                setErrortext('El código debe tener 6 dígitos');
                return;
            }

            // Check if code is a number
            if (isNaN(twofactorcode)) {
                setLoading(false);
                setErrortext('El código debe ser un número');
                return;
            }

            // Check if code is correct
            const response = await checkTwoFactor({ navigation, accessToken, twofactorcode });

            // If code is correct, store user data and navigate to Home
            if (response.status === 200) {

                await EncryptedStorage.setItem('accessToken', accessToken);

                await storeData('me', me);

                // Update the user global AppContext state
                setMe(me);

                // redirect to main stack
                navigation.replace('MainStack');

            } else {
                setLoading(false);
                setErrortext('El código es incorrecto');
                return;
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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