import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Share } from 'react-native'
import Modal from "react-native-modal";
import QPButton from '../../ui/QPButton'
import LottieView from "lottie-react-native"
import ChatSection from '../../ui/ChatSection'
import { AppContext } from '../../../AppContext'
import PeerContainer from '../../ui/PeerContainer'
import { useNavigation } from '@react-navigation/native'
import { getP2POffer } from '../../../utils/QvaPayClient'
import { globalStyles, textStyles, theme } from '../../ui/Theme'

export default function P2PShow({ route }) {

    const { uuid } = route.params
    const { me } = useContext(AppContext)
    const navigation = useNavigation()
    const [offer, setOffer] = useState({})
    const [showChat, setShowChat] = useState(false)
    const [showSteps, setShowSteps] = useState(false)
    const [peer, setPeer] = useState({})
    const [owner, setOwner] = useState({})
    const [isModalVisible, setModalVisible] = useState(false)

    // Format amount and receive to have only 2 decimals
    fixedAmount = parseFloat(offer.amount).toFixed(2)
    fixedReceive = parseFloat(offer.receive).toFixed(2)

    // get the Offer from getP2POffer function
    useEffect(() => {
        const getOffer = async () => {
            try {
                const response = await getP2POffer({ uuid, navigation });

                console.log(response)

                setOffer(response)
                setOwner(response.owner)
                setPeer(response.peer)
            } catch (error) {
                console.log(error)
            }
        }
        getOffer();
    }, [])

    // Apply to an offer and change the status to "applied"
    const applyToOffer = () => {
        setShowChat(true)
        setShowSteps(true)
    }

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
    };

    return (
        <View style={globalStyles.container}>

            {
                owner && owner.username && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <PeerContainer peer={owner} orientation="right" />
                        {
                            peer && peer.username && (
                                <PeerContainer peer={peer} orientation="left" />
                            )
                        }
                    </View>
                )
            }

            {
                offer.status === 'open' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
                                    <View style={{ marginHorizontal: 40 }}>
                                        <LottieView source={require('../../../assets/lotties/looking.json')} autoPlay style={styles.lottie} />
                                    </View>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>¡Oferta publicada!</Text>
                                    <Text style={[textStyles.h4, { textAlign: 'center' }]}>Estamos ahora buscando peers que le interese.</Text>
                                </View>
                            )
                        }

                        {
                            offer.owner && offer.owner.uuid !== me.uuid && (
                                <>
                                    <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
                                        
                                    </View>
                                    <QPButton title="Aplicar a oferta" onPress={applyToOffer} />
                                </>
                            )
                        }
                    </>
                )
            }

            {
                offer.status === 'processing' && (
                    <Text>Processing</Text>
                )
            }

            {
                offer.status === 'completed' && (
                    <Text>Completed</Text>
                )
            }

            {
                offer.status === 'cancelled' && (
                    <Text>Cancelled</Text>
                )
            }

            {
                offer.status === 'revision' && (
                    <Text>Revision</Text>
                )
            }

            {
                offer.status === 'paid' && (
                    <Text>Paid</Text>
                )
            }

            {
                // Share Button if this offer is mine
                offer.status === 'open' && offer.owner && offer.owner.username === me.username && (
                    <QPButton title="Compartir" onPress={onShare} />
                )
            }

            <Modal
                isVisible={isModalVisible}
                animationIn={'slideInUp'}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['down']}
                style={styles.modalview}
            >
                <View style={styles.modalContent}>
                    <Text>ASD</Text>
                    <Text>ASD</Text>
                </View>
            </Modal>

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
    offerReceiveSend: {
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
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
    },
    lottie: {
        width: 180,
        height: 180,
        alignSelf: 'center',
    },
    modalview: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    }
})