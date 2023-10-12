import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, FlatList, View, Text, Pressable, Animated } from 'react-native'
import { theme } from '../../ui/Theme'
import Modal from "react-native-modal"
import P2POffer from '../../ui/P2POffer'
import { useNavigation } from '@react-navigation/native'
// import { apiRequest } from '../../../utils/QvaPayClient'
import { globalStyles, textStyles } from '../../ui/Theme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { AppContext } from '../../../AppContext'
import { SvgUri } from 'react-native-svg'
import LottieView from "lottie-react-native";

export default function P2PIndex() {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [type, setType] = useState('');
    const [myOffers, setMyOffers] = useState(false);
    const [coming, setComing] = useState(true);
    // const [currentPage, setCurrentPage] = useState(1);
    const [p2pOffers, setP2pOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [sellOffers, setSellOffers] = useState([]);
    const [isBuyEnabled, setIsBuyEnabled] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false)

    const fadeAnim1 = useRef(new Animated.Value(0)).current
    const fadeAnim2 = useRef(new Animated.Value(0)).current
    const fadeAnim3 = useRef(new Animated.Value(0)).current
    const translateY1 = fadeAnim1.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })
    const translateY2 = fadeAnim2.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })
    const translateY3 = fadeAnim3.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })

    // useEffect for Offers with getP2POffers
    useEffect(() => {
        getP2POffers()
    }, []);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim3, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim1, fadeAnim2, fadeAnim3]);

    // function to retrieve offers from API
    const getP2POffers = async () => {
        try {
            // setLoading(true)
            // let url = `/p2p/index?type=${type}`
            // myOffers && (url += `&my=true`)

            // console.log(url)

            // // Construct filtering
            // const response = await apiRequest(url, { metthod: "GET" }, navigation)

            // setP2pOffers(response.data)

            // console.log(response.data)

            // setBuyOffers(response.data.filter((offer) => offer.type === 'buy'))
            // setSellOffers(response.data.filter((offer) => offer.type === 'sell'))
            // setLoading(false)
        } catch (error) {
            console.error('Error fetching P2P Offers:', error);
        }
    }

    // Show the filter modal
    const showFilterModal = () => {
        setModalVisible(true)
    }

    const OffersFilter = ({ isBuyEnabled }) => (
        <View style={styles.filterContainer}>
            <Pressable onPress={() => setIsBuyEnabled(true)} style={[styles.filterButton, { backgroundColor: isBuyEnabled && theme.darkColors.success }]}>
                <Text style={[styles.filterLabel, { color: isBuyEnabled ? theme.darkColors.background : theme.darkColors.almost_white }]}>
                    Compra
                </Text>
            </Pressable>
            <Pressable onPress={() => setIsBuyEnabled(false)} style={[styles.filterButton, { backgroundColor: !isBuyEnabled && theme.darkColors.danger }]}>
                <Text style={[styles.filterLabel, { color: theme.darkColors.almost_white }]} >
                    Venta
                </Text>
            </Pressable>
        </View>
    );

    return (
        <View style={globalStyles.container}>

            {
                coming ? (
                    <View style={globalStyles.section}>
                        <Animated.Text style={[styles.fadedText1, { opacity: fadeAnim1, transform: [{ translateY: translateY1 }] }]}>
                            ¿Necesitas comprar Bitcoin? <SvgUri width="22" height="22" uri={`https://qvapay.com/img/coins/btc.svg`} style={{ marginRight: 5, marginBottom: 5 }} />
                        </Animated.Text>
                        <Animated.Text style={[styles.fadedText2, { opacity: fadeAnim2, transform: [{ translateY: translateY2 }] }]}>
                            ¿Deseas acceder a un mercado seguro?
                        </Animated.Text>
                        <Animated.Text style={[styles.fadedText3, { opacity: fadeAnim3, transform: [{ translateY: translateY3 }] }]}>
                            ¿Intercambiar tu moneda por otras mediante P2P?
                        </Animated.Text>
                        <Animated.Text style={[styles.fadedText3, { opacity: fadeAnim3, transform: [{ translateY: translateY3 }] }]}>
                            Muy pronto en QvaPay.
                        </Animated.Text>
                        <Animated.Text style={[styles.fadedText3, { opacity: fadeAnim3, transform: [{ translateY: translateY3 }] }]}>
                            💜
                        </Animated.Text>
                    </View>
                ) : (
                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            ListHeaderComponent={
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                    <View style={{ flex: 1 }}>
                                        <OffersFilter isBuyEnabled={isBuyEnabled} />
                                    </View>
                                    <Pressable onPress={showFilterModal} style={styles.filterIcon} >
                                        <FontAwesome5 name='filter' size={16} style={{ color: theme.darkColors.almost_white }} />
                                    </Pressable>
                                </View>
                            }
                            data={isBuyEnabled ? buyOffers : sellOffers}
                            keyExtractor={(item) => item.uuid}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <P2POffer offer={item} navigation={navigation} />
                            )}
                        />
                    </View>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={[textStyles.h3, { textAlign: 'center' }]}>Solo mis Ofertas:</Text>
                        <BouncyCheckbox
                            size={20}
                            fillColor={theme.darkColors.primary}
                            unfillColor={theme.darkColors.background}
                            iconStyle={{ borderColor: theme.darkColors.primary, marginRight: -15 }}
                            innerIconStyle={{ borderWidth: 1 }}
                            textStyle={{ fontFamily: "Rubik-Regular", textDecorationLine: 'none' }}
                            onPress={(isChecked) => { setMyOffers(isChecked); getP2POffers() }}
                        />
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        padding: 4,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: theme.darkColors.elevation,
    },
    filterButton: {
        flex: 1,
        borderRadius: 6,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterLabel: {
        fontSize: 16,
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.placeholder,
    },
    filterIcon: {
        padding: 10,
        marginLeft: 5,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation,
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
    },

    fadedText1: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Bold'
    },
    fadedText2: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-SemiBold'
    },
    fadedText3: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Medium'
    },
    lottie: {
        width: 160,
        height: 160,
        alignSelf: 'center',
    },
})