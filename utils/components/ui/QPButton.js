import React from 'react'
import { Button } from '@rneui/themed';
import { StyleSheet } from 'react-native';

export default function QPButton(props) {

    return (
        <Button
            {...props}
            buttonStyle={[styles.buttonStyle, props.buttonStyle]}
            titleStyle={[styles.titleStyle, props.titleStyle]}
        />
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        borderWidth: 0,
        color: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: '#7367f0',
    },
    titleStyle: {
        fontSize: 16,
        fontFamily: "Nunito-Black",
    },
})