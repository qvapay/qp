import React, { useState } from 'react'
import { Share } from 'react-native'
import QPButton from '../QPButton'

const Footer = ({ offer, me }) => {

    const { uuid } = me
    const { status, owner } = offer
    const [showChat, setShowChat] = useState(false)
    const [showSteps, setShowSteps] = useState(false)

    // Share offer
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: `Ya puedes pagarme directo en QvaPay 💜\n\nhttps://qvapay.com/payme/${me.username}`,
                message: `Ya puedes pagarme directo en QvaPay 💜\n\nhttps://qvapay.com/payme/${me.username}`,
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
        // TODO Show a confirmation Dialog
        // TODO Send cancel request to API
        console.log('Cancel offer')
    }

    // Apply to an offer and change the status to "applied"
    const onApply = () => {
        setShowChat(true)
        setShowSteps(true)
    }

    return (
        <>
            {
                offer.status === 'open' && offer.owner && offer.owner.uuid === me.uuid && (
                    <>
                        <QPButton title="Cancelar Oferta" onPress={onCancel} danger={true} />
                        <QPButton title="Compartir" onPress={onShare} />
                    </>
                )
            }
            {
                offer.status === 'open' && offer.owner && offer.owner.uuid !== me.uuid && (
                    <QPButton title="Aplicar a oferta" onPress={onApply} />
                )
            }

            {
                offer.status === 'revision' && offer.owner && offer.owner.uuid === me.uuid && (
                    <QPButton title="Revisión" disabled={true} />
                )
            }

            {
                offer.status === 'completed' && offer.owner && offer.owner.uuid === me.uuid && (
                    <QPButton title="Oferta Completada" disabled={true} />
                )
            }

            {
                offer.status === 'cancelled' && offer.owner && offer.owner.uuid === me.uuid && (
                    <QPButton title="Oferta Cancelada" danger={true} disabled={true} />
                )
            }
        </>
    )
}

export default Footer