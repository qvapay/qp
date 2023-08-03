import React from 'react'
import { Pressable, Text, StyleSheet, Vibration } from 'react-native'
import { theme } from './Theme';
import LinearGradient from 'react-native-linear-gradient';

const GENTLE_VIBRATION_PATTERN = [0, 50];

export default function QPButton(props) {

    const { danger, disabled, title, onPress, style } = props;
    const gradientColors = danger ? ['#FF4D4D', theme.darkColors.danger] : [theme.darkColors.primary, '#4537D1'];

    const handlePress = () => {
        Vibration.vibrate(GENTLE_VIBRATION_PATTERN);
        onPress && onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [disabled ? styles.disabledStyle : styles.buttonStyle,
            { transform: [{ scale: pressed ? 0.96 : 1 }] },
            { ...style }]}
        >
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <Text style={styles.titleStyle}>{title}</Text>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Medium'
    },
    disabledStyle: {
        height: 50,
        opacity: 0.5,
        fontSize: 18,
        color: 'white',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradient: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})