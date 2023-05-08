import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const cryptoCurrencies = [
    { id: 'btc-ln', name: 'Bitcoin Lightning' },
    { id: 'btc', name: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum' },
    // Agrega más criptomonedas aquí
];

export default function AddScreen() {
    return (
        <View>
            <Text>AddScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})