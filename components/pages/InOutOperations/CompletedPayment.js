import React from 'react'
import { StyleSheet, View, Text, Animated, Easing, StatusBar } from 'react-native';
import LottieView from "lottie-react-native";

export default function CompletedPayment() {

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <LottieView source={require('../../../assets/lotties/completed.json')} autoPlay loop={false} style={styles.loadingAnimation} />
            <Text style={styles.text}>Pago completado</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmarkContainer: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#4cd964',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    loadingAnimation: {
        width: 450,
        height: 450,
    }
});  