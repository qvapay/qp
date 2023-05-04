import React from 'react'
import { Avatar } from '@rneui/base';
import { StyleSheet, View } from 'react-native'

export default function AvatarPicture({ size = 32, source_uri = 'https://qvapay.com/android-chrome-512x512.png', negative = false }) {

    // Dynamic borderWidth based on size
    const borderWidth = size / 30;
    const borderColor = negative ? '#161d31' : '#FFFFFF';

    return (
        <View>
            <Avatar
                rounded
                size={size}
                avatarStyle={{ borderWidth, borderColor }}
                source={{ uri: source_uri }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})