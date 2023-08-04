import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { theme } from './Theme';

export default function QPTag(props) {

    const { title, style, onPress } = props;

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.primary,
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    }
})