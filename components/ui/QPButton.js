import React from 'react'
import { Button, Pressable, Text } from 'react-native'
import { StyleSheet, Vibration } from 'react-native';
import { theme } from './Theme';

const GENTLE_VIBRATION_PATTERN = [0, 50];

export default function QPButton(props) {

    const handlePress = () => {
        Vibration.vibrate(GENTLE_VIBRATION_PATTERN);
        props.onPress && props.onPress();
    };

    return (
        <Pressable {...props} onPress={handlePress} style={styles.buttonStyle}>
            <Text style={styles.titleStyle}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        color: 'white',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: theme.darkColors.primary,
    },
    titleStyle: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'Rubik-SemiBold'
    },
    disabledStyle: {
        opacity: 0.5,
        backgroundColor: theme.darkColors.primary,
    },
})