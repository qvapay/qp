import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default function QPRoundButton({ size, icon, onPress, style }) {

    return (
        <Pressable style={[styles.roundButton, { ...style }]} onPress={onPress}>
            <FontAwesome5 style={styles.icon} name={icon} size={size} color='white' />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    roundButton: {
        width: 34,
        height: 34,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.darkColors.primary,
    },
})