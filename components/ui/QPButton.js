import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { theme } from './Theme';
import LinearGradient from 'react-native-linear-gradient';

export default function QPButton({ danger, disabled, title, onPress, style }) {

    const gradientColors = danger ? [theme.darkColors.danger, '#C82030'] : [theme.darkColors.primary, '#6153E0'];

    const handlePress = () => {
        console.log("clic")
        if (disabled) return;
        onPress && onPress();
    };

    return (
        <Pressable onPress={handlePress} style={({ pressed }) => [disabled ? styles.disabledStyle : styles.buttonStyle, { transform: [{ scale: pressed ? 0.98 : 1 }] }, { ...style }]} >
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
        fontSize: 17,
        color: 'white',
        fontFamily: 'Rubik-Medium'
    },
    disabledStyle: {
        height: 50,
        opacity: 0.5,
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