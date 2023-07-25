import React from 'react'
import { Button } from '@rneui/themed';
import { StyleSheet, Vibration } from 'react-native';
import { theme } from './Theme';

export default function QPButton(props) {

    // Define a gentle vibration pattern
    const GENTLE_VIBRATION_PATTERN = [0, 50]; // wait for 0ms, vibrate for 50ms

    const handlePress = () => {
        Vibration.vibrate(GENTLE_VIBRATION_PATTERN);
        props.onPress && props.onPress();
    };

    return (
        <Button
            {...props}
            onPress={handlePress}
            titleStyle={[styles.titleStyle, props.titleStyle]}
            buttonStyle={[styles.buttonStyle, props.buttonStyle]}
            disabledStyle={[styles.disabledStyle, props.disabledStyle]}
        />
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        color: '#FFFFFF',
        borderRadius: 6,
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: theme.darkColors.primary,
    },
    titleStyle: {
        fontFamily: 'Rubik-SemiBold'
    },
    disabledStyle: {
        opacity: 0.5,
        backgroundColor: theme.darkColors.primary,
    },
})