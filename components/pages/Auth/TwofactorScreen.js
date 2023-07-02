import React from 'react'
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
    return (
        <KeyboardAwareScrollView contentContainerStyle={[globalStyles.container, { justifyContent: 'center', flex: 1 }]} >
            <Text>TwoFactorScreen</Text>
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