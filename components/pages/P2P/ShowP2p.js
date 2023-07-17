import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import QPButton from '../../ui/QPButton';
import { globalStyles, theme } from '../../ui/Theme';
import ChatSection from '../../ui/ChatSection';
import RatingStars from '../../ui/RatingStars';
import AvatarPicture from '../../ui/AvatarPicture';
import { getP2POffer } from '../../../utils/QvaPayClient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ShowP2p({ route, navigation }) {

    const { uuid } = route.params
    const [offer, setOffer] = useState({})
    const [showChat, setShowChat] = useState(false)
    const [showSteps, setShowSteps] = useState(false)

    // Format amount and receive to have only 2 decimals
    fixedAmount = parseFloat(offer.amount).toFixed(2)
    fixedReceive = parseFloat(offer.receive).toFixed(2)

    // get the Offer from getP2POffer function
    useEffect(() => {
        const getOffer = async () => {
            const response = await getP2POffer({ uuid, navigation });
            setOffer(response);
        }
        getOffer();
    }, [])

    // Apply to an offer and change the status to "applied"
    const applyToOffer = () => {

        // Send API request to see if this P2P is available
        // If it is, then change the status to "processing"
        // If it is not, then show an error message

        setShowChat(true)
        setShowSteps(true)
    }

    // Custom Offer Label
    const offerLabel = () => {
        if (offer.type === 'buy') {
            return 'Comprar'
        } else {
            return 'Vender'
        }
    }

    const OfferInOutComponent = () => (
        <>
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
        </>
    )

    // Custom Offer Label with explanation
    const OfferLabelComponent = () => (
        <>
            <View style={[styles.container, styles.offerLabel]}>
                <Text style={styles.offerLabelText}>
                    Aplica a esta oferta P2P para recibir ${fixedAmount} SQP
                    y pagar a {offer.owner?.name} un total de ${fixedReceive} en {offer.coin_data?.name}
                </Text>
            </View>

            <QPButton title="Aplicar a oferta" onPress={applyToOffer} />
        </>
    )

    // Show Steps to complete Offer
    const OfferStepsComponent = () => (
        <View style={styles.offerSteps}>
            <Text style={styles.offerStepsText}>
                1. Realiza el pago a {offer.owner?.name} por un total de ${fixedReceive} en {offer.coin_data?.name}
            </Text>
            <Text style={styles.offerStepsText}>
                2. Envía el comprobante de pago a {offer.owner?.name} por el chat de QvaPay
            </Text>
        </View>
    )

    return (
        <View style={globalStyles.container}>

            <View style={styles.peerOwnerContainer}>
                <AvatarPicture size={56} source_uri={offer.owner?.profile_photo_url} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.peerName}>{offer.owner?.username}</Text>
                    <RatingStars rating={5.0} fontSize={14} size={14} />
                </View>
            </View>

            {showSteps ? <OfferStepsComponent /> : null}
            {showChat ? null : <OfferInOutComponent />}
            {showChat ? <ChatSection uuid={uuid} /> : <OfferLabelComponent />}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: theme.darkColors.elevation,
    },
    peerOwnerContainer: {
        padding: 10,
        flexDirection: 'row',
    },
    peerName: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Rubik-Medium'
    },
    offerReceiveSend: {
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.darkColors.elevation
    },
    offerLabel: {
        padding: 25,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation
    },
    offerLabelText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Rubik-Medium'
    },
    offerAmount: {
        fontSize: 28,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Rubik-Black',
    },
    offerReceive: {
        fontSize: 28,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Rubik-Black',
    },
    grayDivider: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },
    coinLabel: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    offerSteps: {
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation
    },
    offerStepsText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Regular',
        marginBottom: 3,
    }
})