import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles } from './Theme'
import AvatarPicture from './AvatarPicture';
import RatingStars from './RatingStars';

export default function ProfilePictureSection({ user = {}, negative = false }) {

    // Destructuring the user object
    const {
        profile_photo_url = 'https://qvapay.com/android-chrome-192x192.png',
        name = "",
        lastname = "",
        username = "",
        kyc = 0,
        golden_check = 0,
        average_rating = "0.0",
    } = user;

    const average_rating_number = parseFloat(average_rating);
    const textColor = negative ? '#161d31' : '#FFFFFF';

    return (
        <View style={globalStyles.profilePictureSection}>
            <AvatarPicture size={150} source_uri={profile_photo_url} negative={negative} />
            <View style={styles.fullNameView}>
                <Text style={{ ...globalStyles.fullName, color: textColor }}>{name} {lastname}</Text>
                {golden_check == 1 && (
                    <Image
                        source={require('../../assets/images/gold-badge.png')}
                        style={{ marginLeft: 8, marginTop: 3 }}
                    />
                )}
            </View>
            <Text style={{ fontFamily: 'Nunito-Regular', color: textColor }}>@{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fullNameView: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
})