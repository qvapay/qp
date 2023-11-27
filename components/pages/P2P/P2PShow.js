import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal"
import LottieView from "lottie-react-native"
import ChatSection from '../../ui/ChatSection'
import { AppContext } from '../../../AppContext'
import PeerContainer from '../../ui/PeerContainer'
import SwapContainer from '../../ui/swap/SwapContainer'
import { useNavigation } from '@react-navigation/native'
import { getP2POffer } from '../../../utils/QvaPayClient'
import { globalStyles, textStyles, theme } from '../../ui/Theme'

import Footer from '../../ui/p2p/Footer';

export default function P2PShow({ route }) {

    const { uuid } = route.params
    const { me } = useContext(AppContext)
    const navigation = useNavigation()
    const [offer, setOffer] = useState({})
    const [peer, setPeer] = useState({})
    const [owner, setOwner] = useState({})
    const [offerReady, setOfferReady] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)

    // Format amount and receive to have only 2 decimals
    fixedAmount = parseFloat(offer.amount).toFixed(2)
    fixedReceive = parseFloat(offer.receive).toFixed(2)

    // get the Offer from getP2POffer function
    useEffect(() => {
        const getOffer = async () => {
            try {
                const response = await getP2POffer({ uuid, navigation });
                setOffer(response)
                setOfferReady(true)

                if (response.peer.uuid === me.uuid) {
                    setPeer(me)
                    setOwner(response.owner)
                } else if (response.owner.uuid === me.uuid) {
                    setOwner(me)
                    setPeer(response.peer)
                } else if (response.peer.uuid === "0") {
                    setPeer({})
                    setOwner(response.owner)
                } else {
                    navigation.goBack()
                }

            } catch (error) {
                console.log(error)
            }
        }
        getOffer();
    }, [])

    return (
        <View style={[globalStyles.container, { paddingVertical: 10 }]}>

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
                offerReady &&
                <SwapContainer operation={offer.type} amount={offer.amount} desiredAmount={offer.receive} coin={offer.coin_data} />
            }

            {
                offer.status === 'open' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={styles.container}>
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
                                    <View style={styles.container}>

                                        <View style={[styles.offerContainer2, { flex: 1 }]}>
                                            {/* <Text style={{ color: theme.darkColors.almost_white }}>{offer.only_kyc}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.created_at}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.owner.name}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.private}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.status}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.uuid}</Text> */}
                                            <Text>Offer Details</Text>
                                        </View>
                                    </View>
                                </>
                            )
                        }
                    </>
                )
            }

            {
                offer.status === 'processing' && (
                    <Text style={{ color: theme.darkColors.almost_white }}>Processing</Text>
                )
            }

            {
                offer.status === 'completed' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={styles.container}>
                                    <View style={[styles.offerContainer, { flex: 1 }]}>
                                        <Text style={{ color: theme.darkColors.almost_white }}>CHAT</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            offer.owner && offer.owner.uuid !== me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>CHAT</Text>
                                </View>
                            )
                        }
                    </>
                )
            }

            {
                offer.status === 'cancelled' && (
                    <View style={styles.container}>
                    </View>
                )
            }

            {
                offer.status === 'revision' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>Revision</Text>
                                </View>
                            )
                        }
                        {
                            offer.owner && offer.owner.uuid !== me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>Revision</Text>
                                </View>
                            )
                        }
                    </>
                )
            }

            {
                offer.status === 'paid' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>Paid</Text>
                                </View>
                            )
                        }
                        {
                            offer.owner && offer.owner.uuid !== me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>Paid</Text>
                                </View>
                            )
                        }
                    </>
                )
            }

            <Footer offer={offer} me={me} />

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
    },
    offerContainer: {
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: theme.darkColors.elevation
    },
    offerContainer2: {
        marginTop: 10,
        borderWidth: 3,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: theme.darkColors.elevation,
    },
    offerLabel: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.almost_white,
    },
    offerAmount: {
        fontSize: 24,
        marginLeft: 10,
        fontFamily: 'Rubik-Black',
        color: theme.darkColors.almost_white,
    },
    balanceAmount: {
        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Rubik-Medium',
        color: theme.darkColors.elevation_light,
    },
    offerReceive: {
        fontSize: 28,
        marginLeft: 10,
        fontFamily: 'Rubik-Black',
        color: theme.darkColors.almost_white,
    },
    coinLabel: {
        fontSize: 18,
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.almost_white,
    },
    offerSteps: {
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation
    },
    offerStepsText: {
        fontSize: 16,
        color: theme.darkColors.almost_white,
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