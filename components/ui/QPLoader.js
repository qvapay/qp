import React from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

export default function QPLoader({ width, height }) {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../../assets/lotties/spinner.json')} autoPlay loop style={[styles.lottie, { width, height }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 160,
        height: 160,
        alignSelf: 'center',
    }
})