import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { theme } from './Theme';
import RatingStars from './RatingStars';
import { SvgUri } from 'react-native-svg';
import AvatarPicture from './AvatarPicture';
import { adjustNumber } from '../../utils/Helpers';
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
    fixedAmount = parseFloat(amount).toFixed(2)
    fixedReceive = parseFloat(receive).toFixed(2)
    const usernameLabel = username.length > 14 ? username.substring(0, 14) + '...' : username

    // Navigation function to ShowTransaction screen
    const navigateToP2P = () => {
        navigation.navigate('PeerToPeerStack', {
            screen: 'ShowP2p',
            params: { uuid },
        })
    }

    return (
        <Pressable onPress={navigateToP2P} style={[styles.offerItem, { borderColor: type == "buy" ? theme.darkColors.success : theme.darkColors.danger, overflow: 'hidden' }]}>

            <View style={styles.coinLogo}>
                <SvgUri width="72" height="72" uri={coin_logo} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 55 }}>
                <View style={styles.offerDetails}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name='arrow-down' size={14} color={theme.darkColors.success} />
                        <Text style={styles.amount}>$ {fixedAmount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name='arrow-up' size={14} color={theme.darkColors.danger} />
                        <Text style={styles.amount}>$ {fixedReceive}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name='percent' size={10} color={theme.darkColors.almost_white} style={{ marginRight: 3, marginLeft: 1 }} />
                        <Text style={styles.amount}>{adjustNumber(fixedReceive / fixedAmount)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.peerContainer}>

                <View style={{}}>
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

        </Pressable>
    )
}

const styles = StyleSheet.create({
    offerItem: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 2,
        paddingVertical: 5,
        marginHorizontal: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: theme.darkColors.elevation,
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
        fontFamily: 'Rubik-Light',
    },
    offerAmountLabel: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Rubik-Light',
    },
    amount: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        fontFamily: 'Rubik-Bold',
    },
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
    coinLogo: {
        left: -16,
        width: 48,
        bottom: 18,
        height: 48,
        position: 'absolute',
    },
})