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
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.darkColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
})