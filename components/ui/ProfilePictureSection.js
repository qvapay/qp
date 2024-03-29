import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyles, theme } from './Theme'
import AvatarPicture from './AvatarPicture';

export default function ProfilePictureSection({ user = {}, negative = false, size = 150 }) {

    // Destructuring the user object
    const {
        profile_photo_url = 'https://qvapay.com/android-chrome-192x192.png',
        name = "",
        lastname = "",
        username = "",
        kyc = 0,
        golden_check = 0,
        average_rating = "0.0",
        vip = 0,
    } = user;

    // const average_rating_number = parseFloat(average_rating);
    const textColor = negative ? theme.darkColors.background : 'white';

    return (
        <View style={globalStyles.profilePictureSection}>

            <AvatarPicture
                size={size}
                showBadge={true}
                vip={vip}
                negative={negative}
                rating={average_rating}
                source_uri={profile_photo_url}
            />

            <View style={styles.fullNameView}>
                <Text style={{ ...globalStyles.fullName, color: textColor }}>{name} {lastname}</Text>
                {
                    golden_check == 1 && (<Image source={require('../../assets/images/gold-badge.png')} style={{ marginLeft: 8, height: 20, width: 20 }} />)
                }
            </View>
            <Text style={[styles.usernameText, { color: textColor }]}>@{username}</Text>
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
    usernameText: {
        fontSize: 16,
        fontFamily: 'Rubik-Medium',
    }
})