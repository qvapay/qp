import React from 'react'
import { Pressable, Text } from 'react-native'
import { StyleSheet, Vibration } from 'react-native';
import { theme } from './Theme';

const GENTLE_VIBRATION_PATTERN = [0, 50];

export default function QPButton(props) {

    const { danger, disabled } = props;

    const handlePress = () => {
        Vibration.vibrate(GENTLE_VIBRATION_PATTERN);
        props.onPress && props.onPress();
    };

    return (
        <Pressable onPress={handlePress} style={[disabled ? styles.disabledStyle : styles.buttonStyle, { backgroundColor: danger ? theme.darkColors.danger : theme.darkColors.primary }, { ...props.style }]}>
            <Text style={styles.titleStyle}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        color: 'white',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Medium'
    },
    disabledStyle: {
        opacity: 0.5,
        fontSize: 18,
        color: 'white',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: theme.darkColors.primary,
    },
})