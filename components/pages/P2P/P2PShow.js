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
import { adjustNumber } from '../../../utils/Helpers'
import { SvgUri } from 'react-native-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SwapContainer from '../../ui/swap/SwapContainer';

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
                setOffer(response)

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

            {/** Operation Container */}
            <SwapContainer operation={offer.type} />

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

                                        {/* <Text style={{ color: theme.darkColors.almost_white }}>{offer.type}</Text> */}

                                        <View style={[styles.offerContainer, { marginBottom: -8 }]}>
                                            <Text style={[textStyles.h4, { color: theme.darkColors.elevation_light }]}>{offer.type == 'buy' ? 'Recibes:' : 'Pagas:'}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                <View>
                                                    <Text style={styles.offerAmount}>${adjustNumber(offer.amount)}</Text>
                                                    <Text style={styles.balanceAmount}>Balance: ${adjustNumber(me.balance)}</Text>
                                                </View>

                                                <View style={{ alignItems: 'center' }}>
                                                    <SvgUri width="56" height="56" uri={'https://qvapay.com/img/coins/qvapay.svg'} />
                                                    <Text style={styles.offerLabel}>USD</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                                            <FontAwesome5 name={offer.type == 'buy' ? 'chevron-circle-up' : 'chevron-circle-down'} size={20} style={{ color: theme.darkColors.almost_white }} />
                                        </View>

                                        <View style={[styles.offerContainer, { marginTop: -8 }]}>
                                            <Text style={[textStyles.h4, { color: theme.darkColors.elevation_light }]}>{offer.type == 'buy' ? 'Pagas:' : 'Recibes:'}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={styles.offerAmount}>${adjustNumber(offer.receive)}</Text>
                                                <View style={{ alignItems: 'center' }}>
                                                    <SvgUri width="56" height="56" uri={'https://qvapay.com/img/coins/' + offer.coin_data.logo + '.svg'} />
                                                    <Text style={styles.offerLabel}>{offer.coin_data.name}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={[styles.offerContainer2, { flex: 1 }]}>
                                            {/* <Text style={{ color: theme.darkColors.almost_white }}>{offer.only_kyc}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.created_at}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.owner.name}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.private}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.status}</Text>
                                            <Text style={{ color: theme.darkColors.almost_white }}>{offer.uuid}</Text> */}
                                            <Text></Text>
                                        </View>
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
                    <Text style={{ color: theme.darkColors.almost_white }}>Processing</Text>
                )
            }

            {
                offer.status === 'completed' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={styles.container}>
                                    <View style={styles.offerContainer}>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.coin}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{adjustNumber(offer.amount)}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{adjustNumber(offer.receive)}</Text>
                                    </View>
                                    <View style={[styles.offerContainer, { flex: 1 }]}>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.only_kyc}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.created_at}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.owner.name}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.private}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.status}</Text>
                                        <Text style={{ color: theme.darkColors.almost_white }}>{offer.uuid}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            offer.owner && offer.owner.uuid !== me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.coin}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.amount}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.receive}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.only_kyc}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.created_at}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.owner.name}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.private}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.uuid}</Text>
                                    <Text style={{ color: theme.darkColors.almost_white }}>{offer.status}</Text>
                                </View>
                            )
                        }
                    </>
                )
            }

            {
                offer.status === 'cancelled' && (
                    <>
                        {
                            offer.owner && offer.owner.uuid === me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>Cancelled</Text>
                                </View>
                            )
                        }
                        {
                            offer.owner && offer.owner.uuid !== me.uuid && (
                                <View style={styles.container}>
                                    <Text style={{ color: theme.darkColors.almost_white }}>Cancelled</Text>
                                </View>
                            )
                        }
                    </>
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