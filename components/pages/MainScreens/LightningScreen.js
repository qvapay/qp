import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { globalStyles } from '../../ui/Theme'
import { SvgUri } from 'react-native-svg'
import LottieView from "lottie-react-native";

export default function LightningScreen() {

    const fadeAnim1 = useRef(new Animated.Value(0)).current
    const fadeAnim2 = useRef(new Animated.Value(0)).current
    const fadeAnim3 = useRef(new Animated.Value(0)).current
    const translateY1 = fadeAnim1.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })
    const translateY2 = fadeAnim2.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })
    const translateY3 = fadeAnim3.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim3, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim1, fadeAnim2, fadeAnim3]);

    return (
        <View style={[globalStyles.container, { alignItems: 'center', paddingHorizontal: 50 }]}>
            <Animated.Text style={[styles.fadedText1, { opacity: fadeAnim1, transform: [{ translateY: translateY1 }] }]}>
                Sabemos que te gusta Bitcoin <SvgUri width="22" height="22" uri={`https://qvapay.com/img/coins/btc.svg`} style={{ marginRight: 5, marginBottom: 5 }} />
            </Animated.Text>
            <Animated.Text style={[styles.fadedText2, { opacity: fadeAnim2, transform: [{ translateY: translateY2 }] }]}>
                Sabemos que te gustan las Stories
            </Animated.Text>
            <Animated.Text style={[styles.fadedText3, { opacity: fadeAnim3, transform: [{ translateY: translateY3 }] }]}>
                Te va a gustar QvaPay
            </Animated.Text>
            <Animated.Text style={[styles.fadedText3, { opacity: fadeAnim3, transform: [{ translateY: translateY3 }] }]}>
                <LottieView source={require('../../../assets/lotties/bitcoin.json')} autoPlay style={styles.lottie} />
            </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fadedText1: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Bold'
    },
    fadedText2: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-SemiBold'
    },
    fadedText3: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Medium'
    },
    lottie: {
        width: 160,
        height: 160,
        alignSelf: 'center',
    },
})