import React from 'react'
import { theme } from './Theme';
import { Pressable, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function QPButton({ success, danger, disabled, title, onPress, style, outline = false }) {

    const borderColors = success ? [theme.darkColors.success, '#7BFFB1'] : danger ? [theme.darkColors.danger, '#DB253E'] : [theme.darkColors.primary, '#6759EF'];
    const gradientColors = outline ? [theme.darkColors.background, theme.darkColors.background] : success ? [theme.darkColors.success, '#7BFFB1'] : danger ? [theme.darkColors.danger, '#DB253E'] : [theme.darkColors.primary, '#6759EF'];
    const textColor = success ? 'black' : danger ? 'white' : 'white';
    const outlineColor = outline ? borderColors[0] : 'transparent';

    const handlePress = () => {
        if (disabled) return;
        onPress && onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                disabled ? styles.disabledStyle : styles.buttonStyle,
                { transform: [{ scale: pressed ? 0.98 : 1 }] },
                { borderColor: outlineColor },
                { ...style },
            ]}
        >
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <Text style={[styles.titleStyle, { color: textColor }]}>{title}</Text>
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
        justifyContent: 'center',
        borderWidth: 2,
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
        justifyContent: 'center',
        borderWidth: 2,
    },
    gradient: {
        height: 46,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})