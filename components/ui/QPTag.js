import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from './Theme';

export default function QPTag(props) {

    const { title, style } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
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