import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import RatingStars from '../../ui/RatingStars';
import AvatarPicture from '../../ui/AvatarPicture';
import { getP2POffer } from '../../../utils/QvaPayClient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ShowP2p({ route, navigation }) {

    const { uuid } = route.params;
    const [offer, setOffer] = useState({})

    // Format amount and receive to have only 2 decimals
    fixedAmount = parseFloat(offer.amount).toFixed(2)
    fixedReceive = parseFloat(offer.receive).toFixed(2)

    // get the Offer from getP2POffer function
    useEffect(() => {
        const getOffer = async () => {
            const response = await getP2POffer({ uuid, navigation });
            console.log(response)
            setOffer(response);
        }
        getOffer();
    }, [])

    console.log(offer)

    // Apply to an offer and change the status to "applied"
    const applyToOffer = () => {
    }

    return (
        <View style={globalStyles.container}>

            <View style={styles.peerOwnerContainer}>
                <AvatarPicture size={56} source_uri={offer.owner?.profile_photo_url} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.peerName}>{offer.owner?.username}</Text>
                    <RatingStars rating={5.0} fontSize={14} size={14} />
                </View>
            </View>

            <View style={styles.offerReceiveSend}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name='arrow-down' size={26} color='#28c76f' />
                        <Text style={styles.offerAmount}>$ {fixedAmount}</Text>
                    </View>
                    <View>
                        <Text style={styles.coinLabel}>SQP</Text>
                    </View>
                </View>
                <View style={styles.grayDivider}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name='arrow-up' size={26} color='#ea5455' />
                        <Text style={styles.offerReceive}>$ {fixedReceive}</Text>
                    </View>
                    <View>
                        <Text style={styles.coinLabel}>{offer.coin_data?.name}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.container, styles.offerLabel]}>
                <Text style={styles.offerLabelText}>
                    Aplica a esta oferta P2P para recibir ${fixedAmount} SQP
                    y pagar a {offer.owner?.name} un total de ${fixedReceive}
                    en {offer.coin_data?.name}
                </Text>
            </View>

            <QPButton title="Aplicar a oferta" onPress={applyToOffer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#161d31',
    },
    peerOwnerContainer: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    peerName: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Nunito-Medium'
    },
    offerReceiveSend: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#283046'
    },
    offerLabel: {
        padding: 25,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#283046'
    },
    offerLabelText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Nunito-Medium'
    },
    offerAmount: {
        fontSize: 28,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Nunito-Black',
    },
    offerReceive: {
        fontSize: 28,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Nunito-Black',
    },
    grayDivider: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },
    coinLabel: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito-Regular',
    }
})