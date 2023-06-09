import React from 'react'
import { StyleSheet, Image } from 'react-native'

export default function QPLogo({ width = '50%', height = 100, resizeMode = 'contain' }) {

    return (
        <Image
            source={require('../../assets/images/logo-qvapay.png')}
            style={{ width, height, resizeMode }}
        />
    )
}