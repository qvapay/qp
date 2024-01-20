import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RatingStars from './RatingStars';
import AvatarPicture from './AvatarPicture';
import { theme } from './Theme';

export default function PeerContainer({ peer, orientation = 'left' }) {

    const { username = "", profile_photo_url, average_rating, vip } = peer || {};
    const usernameLabel = username.length > 10 ? username.substring(0, 10) + '' : username

    return (
        <View style={[styles.peerContainer, orientation === 'right' ? { flexDirection: 'row-reverse' } : {}]}>

            <View style={{
                flex: 1,
                alignItems: orientation === 'left' ? 'flex-end' : 'flex-start',
                marginRight: orientation === 'left' ? 8 : 0,
                marginLeft: orientation === 'right' ? 8 : 0,
            }}>
                <Text style={styles.peerUsername}>@{usernameLabel}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <RatingStars rating={average_rating} fontSize={12} size={10} />
                </View>
                <>
                    {
                        // badges
                    }
                </>
            </View>

            <AvatarPicture size={48} source_uri={profile_photo_url} vip={vip} />
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
        fontFamily: 'Rubik-Medium',
        color: theme.darkColors.almost_white,
    },
    peerBadges: {
        fontSize: 12,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.almost_white,
    },
})