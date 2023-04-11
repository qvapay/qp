import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SvgUri } from 'react-native-svg';
import AvatarPicture from './AvatarPicture';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import RatingStars from './RatingStars';

export default function P2POffer({ offer }) {

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

    console.log(average_rating)

    // Format amount and receive to have only 2 decimals
    fixedAmount = parseFloat(amount).toFixed(2)
    fixedReceive = parseFloat(receive).toFixed(2)

    // limit the amount of characters for the username
    const usernameLabel = username.length > 10 ? username.substring(0, 10) + '...' : username

    return (
        <Pressable
            onPress={() => console.log('Pressed')}
        >

            <View style={styles.offerItem}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={[styles.coinSection, { width: 50, height: 50 }]}>
                        <SvgUri width="100%" height="100%" uri={coin_logo} />
                    </View>

                    <View style={styles.offerDetails}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.offerAmountLabel}>Recibe: </Text>
                            <Text style={styles.offerAmount}>$ {fixedAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.offerAmountLabel}>Paga: </Text>
                            <Text style={styles.offerReceive}>$ {fixedReceive}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.peerContainer}>

                    <View style={{ marginRight: 10, justifyContent: 'flex-end' }}>
                        <Text style={styles.peerUsername}>{usernameLabel}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <RatingStars rating={average_rating} fontSize={12} size={10} />
                        </View>
                    </View>

                    <AvatarPicture size={50} source_uri={profile_photo_url} />
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
        fontFamily: 'Nunito-Black',
    },
    offerReceive: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Nunito-Black',
    },
    peerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    peerUsername: {
        fontSize: 14,
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