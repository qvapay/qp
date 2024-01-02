import React, { useEffect, useState } from 'react'
import { Share, Alert, View } from 'react-native'
import QPButton from '../QPButton'
import QPLoader from '../QPLoader'
import LottieView from 'lottie-react-native'
import { apiRequest } from '../../../utils/QvaPayClient'
import { useNavigation } from '@react-navigation/native'

export default function Footer({ offer, me }) {

    const navigation = useNavigation()
    const [p2pOffer, setP2POffer] = useState({})
    const [loading, setLoading] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [offerReady, setOfferReady] = useState(false)

    useEffect(() => {
        setP2POffer(offer)
        setOfferReady(true)
    }, [])

    // Apply to an offer and change the status to "processing"
    const onApply = () => {
        Alert.alert(
            "Aplicar a Oferta",
            "¿Estás seguro que deseas aplicar a esta oferta?",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Si, aplicar",
                    onPress: () => { confirmApply() }
                }
            ]
        )
    }

    // Mark offer as paid
    const onPaid = () => {
        Alert.alert(
            "Completar Oferta",
            "¿Has enviado el pago acordado correctamente?",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Si, he pagado",
                    onPress: () => { confirmPaid() }
                }
            ]
        )
    }

    // Received payment
    const onReceived = () => {
        Alert.alert(
            "Completar Oferta",
            "¿Has recibido el pago acordado correctamente?",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Si, he recibido",
                    onPress: () => { confirmReceived() }
                }
            ]
        )
    }

    // Cancel offer
    const onCancel = () => {
        Alert.alert(
            "Cancelar Oferta",
            "¿Estás seguro que deseas cancelar esta oferta?",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Si, cancelar",
                    onPress: () => { confirmCancellation() }
                }
            ]
        )
    }

    // Share offer
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: `Mira esta oferta en QvaPay 💜\n\nhttps://qvapay.com/p2p/${p2pOffer.uuid}`,
                message: `Estoy usando el P2P de QvaPay y esta oferta puede interesarte 👍\n\nhttps://qvapay.com/p2p/${p2pOffer.uuid}`,
            })
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
            Alert.alert(error.message)
        }
    }

    // API to confirm apply
    const confirmApply = async () => {
        try {
            setLoading(true)
            let url = `/p2p/${p2pOffer.uuid}/apply`
            const response = await apiRequest(url, { method: "POST" }, navigation)
            console.log(response)
            setP2POffer({ ...p2pOffer, status: 'processing' })
            setLoading(false)
        } catch (error) {
            console.error('Error applying to P2P Offer:', error)
        }
    }

    // API to confirm payment
    const confirmPaid = async () => {
        try {
            setLoading(true)
            let url = `/p2p/${p2pOffer.uuid}/paid`
            const response = await apiRequest(url, { method: "POST" }, navigation)
            console.log(response)
            setP2POffer({ ...p2pOffer, status: 'paid' })
            setLoading(false)
            Alert.alert('Oferta pagada', 'Has marcado la oferta como pagada, ahora el dueño de la oferta debe confirmar la recepción del pago.')
        }
        catch (error) {
            console.error('Error confirming P2P Offer:', error)
        }
    }

    // API to confirm received payment
    const confirmReceived = async () => {
        try {
            setLoading(true)
            let url = `/p2p/${p2pOffer.uuid}/received`
            const response = await apiRequest(url, { method: "POST" }, navigation)
            console.log(response)
            setP2POffer({ ...p2pOffer, status: 'completed' })
            setLoading(false)
            Alert.alert('Oferta completada', 'Has confirmado la recepción del pago, la oferta ha sido completada exitosamente.')
        } catch (error) {
            console.error('Error confirming P2P Offer:', error)
        }
    }

    // API to confirm Cancellation
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

    if (!offerReady) {
        return (
            <QPLoader width={70} height={70} />
        )
    }

    return (
        <>
            {
                loading ? (
                    <QPLoader width={70} height={70} />
                ) : (
                    <>
                        {p2pOffer.status === 'open' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                            <>
                                <QPButton title="Cancelar Oferta" onPress={onCancel} danger={true} />
                                <QPButton title="Compartir" onPress={onShare} />
                            </>
                        )}
                        {p2pOffer.status === 'open' && p2pOffer.owner && p2pOffer.owner.uuid !== me.uuid && (
                            <QPButton title="Aplicar a oferta" onPress={onApply} />
                        )}

                        {p2pOffer.status === 'paid' && p2pOffer.owner && p2pOffer.owner.uuid !== me.uuid && (
                            <QPButton title="Oferta pagada" disabled={true} />
                        )}

                        {p2pOffer.status === 'paid' && p2pOffer.owner && p2pOffer.owner.uuid == me.uuid && (
                            <QPButton title="Oferta Recibida" onPress={onReceived} />
                        )}

                        {p2pOffer.status === 'processing' && p2pOffer.owner && p2pOffer.owner.uuid !== me.uuid && (
                            <>
                                <QPButton title="Cancelar Oferta" onPress={onCancel} danger={true} />
                                <QPButton title="Completar Oferta" onPress={onPaid} />
                            </>
                        )}

                        {p2pOffer.status === 'processing' && p2pOffer.owner && p2pOffer.owner.uuid == me.uuid && (
                            <>
                                <QPButton title="Cancelar Oferta" onPress={onCancel} danger={true} />
                                <QPButton title="Oferta Recibida" onPress={onReceived} />
                            </>
                        )}

                        {p2pOffer.status === 'revision' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                            <QPButton title="Oferta en Revisión" disabled={true} />
                        )
                        }

                        {p2pOffer.status === 'completed' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                            <QPButton title="Oferta Completada" disabled={true} />
                        )}

                        {p2pOffer.status === 'cancelled' && p2pOffer.owner && p2pOffer.owner.uuid === me.uuid && (
                            <QPButton title="Oferta Cancelada" danger={true} disabled={true} />
                        )}
                    </>
                )
            }
        </>
    )
}