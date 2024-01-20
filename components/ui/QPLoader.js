import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

export default function QPLoader({ width = 160, height = 160 }) {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../../assets/lotties/spinner.json')} autoPlay loop style={{ alignSelf: 'center', width, height }} />
        </View>
    )
}