import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AvatarPicture({ size = 32, source_uri = 'https://qvapay.com/android-chrome-512x512.png', negative = false, showBadge = false, rating = 0.0 }) {

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
            {showBadge && (
                <View style={styles.badgeRating}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeRatingText}>{rating}</Text>
                        <FontAwesome name="star" size={14} style={styles.faIcon} />
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    badgeRating: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -8,
        alignSelf: 'center',
    },
    badge: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: '#7367f0',
        alignItems: 'center',
    },
    badgeRatingText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Rubik-Bold',
    },
    faIcon: {
        marginLeft: 5,
        color: 'yellow',
    }
})