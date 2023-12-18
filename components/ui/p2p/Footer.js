import React, { useEffect, useState } from 'react'
import { Share, Alert, StyleSheet, View } from 'react-native'
import QPButton from '../QPButton'
import LottieView from 'lottie-react-native'
import { apiRequest } from '../../../utils/QvaPayClient'
import { useNavigation } from '@react-navigation/native'

export default function Footer({ offer, me }) {

    const navigation = useNavigation();
    const [p2pOffer, setP2POffer] = useState({})
    const [loading, setLoading] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [offerReady, setOfferReady] = useState(false)

    useEffect(() => {
        setP2POffer(offer)
        setOfferReady(true)
    }, [])

    // Share offer
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: `Mira esta oferta en QvaPay 💜\n\nhttps://qvapay.com/p2p/${p2pOffer.uuid}`,
                message: `Estoy usando el P2P de QvaPay y esta oferta puede interesarte 👍\n\nhttps://qvapay.com/p2p/${p2pOffer.uuid}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    // Cancel offer
    const onCancel = () => {
        Alert.alert(
            "Cancelar Oferta",
            "¿Estás seguro que deseas cancelar esta oferta?",
            [
                {
                    text: "No",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Si, cancelar",
                    onPress: () => { confirmCancellation() }
                }
            ]
        );
    }

    const confirmCancellation = async () => {
        try {
            setLoading(true)
            let url = `/p2p/${p2pOffer.uuid}/cancel`
            const response = await apiRequest(url, { method: "POST" }, navigation)
            console.log(response)
            setP2POffer({ ...p2pOffer, status: 'cancelled' })
            setLoading(false)
            Alert.alert('Oferta cancelada', 'La oferta ha sido cancelada exitosamente')
        } catch (error) {
            console.error('Error cancelling P2P Offer:', error)
        }
    }

    // Apply to an offer and change the status to "applied"
    const onApply = () => {
        setShowChat(true)
    }

    if (!offerReady) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <LottieView source={require('../../../assets/lotties/spinner.json')} autoPlay style={styles.lottie} />
            </View>
        )
    }

    return (
        <>
            {
                loading ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView source={require('../../../assets/lotties/spinner.json')} autoPlay style={styles.lottie} />
                    </View>
                ) : (
                    <>
                        {
                            p2pOffer.status === 'open' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                                <>
                                    <QPButton title="Cancelar Oferta" onPress={onCancel} danger={true} />
                                    <QPButton title="Compartir" onPress={onShare} />
                                </>
                            )
                        }
                        {
                            p2pOffer.status === 'open' && p2pOffer.owner && p2pOffer.owner.uuid !== me.uuid && (
                                <QPButton title="Aplicar a oferta" onPress={onApply} />
                            )
                        }

                        {
                            p2pOffer.status === 'revision' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                                <QPButton title="Revisión" disabled={true} />
                            )
                        }

                        {
                            p2pOffer.status === 'completed' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                                <QPButton title="Oferta Completada" disabled={true} />
                            )
                        }

                        {
                            p2pOffer.status === 'cancelled' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                                <QPButton title="Oferta Cancelada" danger={true} disabled={true} />
                            )
                        }
                    </>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 120,
        height: 120,
        alignSelf: 'center',
    },
})