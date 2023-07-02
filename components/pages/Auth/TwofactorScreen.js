import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Loader from '../../ui/Loader';
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { storeData } from '../../../utils/AsyncStorage';
import { qvaPayClient } from '../../../utils/QvaPayClient';
import EncryptedStorage from 'react-native-encrypted-storage';

import * as Sentry from '@sentry/react-native';

export default function TwoFactorScreen() {

    const [loading, setLoading] = useState(false);
    const [twofactorcode, setTwofactorcode] = useState('');

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

            <QPButton title="Iniciar Sesión" onPress={handleLoginSubmit} />

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