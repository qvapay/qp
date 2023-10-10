import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RatingStars from './RatingStars';
import AvatarPicture from './AvatarPicture';

export default function PeerContainer({ peer, orientation = 'left' }) {

    const { username, profile_photo_url, average_rating } = peer
    const usernameLabel = username.length > 10 ? username.substring(0, 10) + '' : username

    return (
        <View style={styles.peerContainer}>
            <View>
                <Text style={styles.peerUsername}>{usernameLabel}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <RatingStars rating={average_rating} fontSize={12} size={10} />
                </View>
                <>
                    {
                        // badges
                    }
                </>
            </View>
            <AvatarPicture size={48} source_uri={profile_photo_url} />
        </View>
    )
}

const styles = StyleSheet.create({
    peerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    peerUsername: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Light',
    },
    peerBadges: {
        fontSize: 12,
        color: 'white',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        fontFamily: 'Rubik-Regular',
    },
})