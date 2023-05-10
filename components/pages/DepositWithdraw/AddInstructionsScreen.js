import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AddInstructionsScreen({ route }) {

    const { amount, crypto } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AddInstructionsScreen</Text>
            <Text style={styles.text}>Amount: {amount}</Text>
            <Text style={styles.text}>Crypto: {crypto}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
    },
})