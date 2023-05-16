import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Animated, Easing, StatusBar } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CompletedPayment() {

    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const opacity = animation.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [0, 0.8, 1],
    });

    const scale = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.2, 1],
    });

    const rotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '0deg'],
    });

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Animated.View style={[styles.checkmarkContainer, { opacity, transform: [{ scale }, { rotate }] }]}>
                <FontAwesome5 name="check" size={60} color="#fff" />
            </Animated.View>
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
        color: '#fff',
        fontFamily: 'Nunito-Regular',
    },
});  