import React from 'react'
import { Avatar, Badge } from '@rneui/base';
import { Pressable, StyleSheet, View } from 'react-native'

export default function AvatarPicture({ navigation, size = 32, source_uri = "https://qvapay.com/android-chrome-192x192.png" }) {

    // Dynamic borderWidth based on size
    const borderWidth = size / 30;

    return (
        <View>
            <Avatar
                rounded
                size={size}
                avatarStyle={[styles.avatarStyle, { borderWidth }]}
                source={{ uri: source_uri }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatarStyle: {
        borderColor: 'white',
    },
})