import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import RatingStars from './RatingStars';
import { SvgUri } from 'react-native-svg';
import AvatarPicture from './AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function P2POffer({ offer, navigation }) {

    const {
        uuid,
        type,
        coin,
        amount,
        receive,
        coin_data,
        owner
    } = offer
    const coin_logo = 'https://qvapay.com/img/coins/' + coin_data.logo + '.svg'
    const { username, profile_photo_url, average_rating } = owner

    // Format amount and receive to have only 2 decimals
    fixedAmount = parseFloat(amount).toFixed(2)
    fixedReceive = parseFloat(receive).toFixed(2)

    // limit the amount of characters for the username
    const usernameLabel = username.length > 14 ? username.substring(0, 14) + '...' : username

    // Navigation function to ShowTransaction screen
    const navigateToP2P = () => {
        console.log(uuid)
        navigation.navigate('PeerToPeerStack', {
            screen: 'ShowP2p',
            params: { uuid },
        })
    }

    return (
        <Pressable onPress={navigateToP2P} >
            <View style={styles.offerItem}>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                    <View style={[styles.coinSection, { width: 50, height: 50 }]}>
                        <SvgUri width="100%" height="100%" uri={coin_logo} />
                    </View>

                    <View style={styles.offerDetails}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name='arrow-down' size={14} color='#28c76f' />
                            <Text style={styles.offerAmount}>$ {fixedAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name='arrow-up' size={14} color='#ea5455' />
                            <Text style={styles.offerReceive}>$ {fixedReceive}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.peerContainer}>
                    <AvatarPicture size={48} source_uri={profile_photo_url} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.peerUsername}>{usernameLabel}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <RatingStars rating={average_rating} fontSize={12} size={10} />
                        </View>
                    </View>
                </View>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    offerItem: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    coinSection: {
        marginRight: 15,
    },
    offerDetails: {
        flexDirection: 'column',
    },
    offerRatio: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Nunito-Light',
    },
    offerAmountLabel: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Nunito-Light',
    },
    offerAmount: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        fontFamily: 'Nunito-Black',
    },
    offerReceive: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        fontFamily: 'Nunito-Black',
    },
    peerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    peerUsername: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Nunito-Light',
    },
    peerBadges: {
        fontSize: 12,
        color: 'white',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        fontFamily: 'Nunito-Regular',
    },
})