import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AddInstructionsScreen({ route }) {

    const { amount, crypto } = route.params;

    // TODO: Add instructions for each payment method
    // TODO: Add a button to copy the instructions to the clipboard
    // TODO: Get the wallet address from the QvaPay API
    // TODO: Show a QR code for the wallet address
    // TODO: Add a button to copy the wallet address to the clipboard
    // TODO: Add a button to open the wallet address in the wallet app
    // TODO: Check for completed payment and show a success message

    return (
        <View style={styles.container}>
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