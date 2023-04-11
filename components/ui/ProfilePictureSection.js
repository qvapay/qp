import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles } from './Theme'
import AvatarPicture from './AvatarPicture';
import RatingStars from './RatingStars';

export default function ProfilePictureSection({ user = {} }) {

    console.log(user)

    // Destructuring the user object
    const {
        profile_photo_url = 'https://qvapay.com/android-chrome-192x192.png',
        name = "",
        lastname = "",
        kyc = 0,
        golden_check = 0,
        average_rating = "0.0",
    } = user;

    // convert the average_rating to a number
    const average_rating_number = parseFloat(average_rating);

    return (
        <View style={globalStyles.profilePictureSection}>
            <AvatarPicture size={150} source_uri={profile_photo_url} />
            <View style={styles.fullNameView}>
                <Text style={globalStyles.fullName}>{name} {lastname}</Text>
                {golden_check == 1 && (
                    <Image
                        source={require('../../assets/images/gold-badge.png')}
                        style={{ marginLeft: 8, marginTop: 3 }}
                    />
                )}
            </View>
            <RatingStars rating={average_rating_number} />
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
    badgesSection: {
        marginTop: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Nunito-Light',
    }
})