import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

export default function SendingPayment() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="white" size="large" />
            <Text style={styles.loadingText}>Procesando pago ...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'Rubik-Regular',
    },
})