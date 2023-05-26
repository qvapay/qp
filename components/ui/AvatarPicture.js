import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image';


export default function AvatarPicture({ size = 32, source_uri = 'https://qvapay.com/android-chrome-512x512.png', negative = false }) {

    // Dynamic borderWidth based on size
    const borderWidth = size / 24;
    const borderColor = negative ? '#161d31' : '#FFFFFF';

    return (
        <View>
            <FastImage
                source={{
                    uri: source_uri,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{ width: size, height: size, borderRadius: size / 2, borderWidth, borderColor }}
            />
        </View>
    )
}