import React from 'react'
import { Button } from '@rneui/themed';
import { StyleSheet } from 'react-native';

// import global styles and theme
import { theme } from './Theme';

export default function QPButton(props) {

    return (
        <Button
            {...props}
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