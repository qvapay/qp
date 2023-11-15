import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, FlatList, View, Text, Pressable, Animated } from 'react-native'
import { theme } from '../../ui/Theme'
import Modal from "react-native-modal"
import P2POffer from '../../ui/P2POffer'
import { useNavigation } from '@react-navigation/native'
import { apiRequest } from '../../../utils/QvaPayClient'
import { globalStyles, textStyles } from '../../ui/Theme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { AppContext } from '../../../AppContext'
import QPButton from '../../ui/QPButton'

export default function P2PIndex() {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [type, setType] = useState('buy');
    const [myOffers, setMyOffers] = useState(false);
    const [loading, setLoading] = useState(false)

    const [p2pOffers, setP2pOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [sellOffers, setSellOffers] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false)

    // useEffect for Offers with getP2POffers
    useEffect(() => {
        console.log(type)
        getP2POffers()
    }, [type]);

    // function to retrieve offers from API
    const getP2POffers = async () => {
        try {
            setLoading(true)
            let url = `/p2p/index?type=${type}`
            myOffers && (url += `&my=true`)

            console.log(url)

            const response = await apiRequest(url, { method: "GET" }, navigation)

            setP2pOffers(response.data)
            setBuyOffers(response.data.filter((offer) => offer.type === 'buy'))
            setSellOffers(response.data.filter((offer) => offer.type === 'sell'))
            setLoading(false)

        } catch (error) {
            console.error('Error fetching P2P Offers:', error);
        }
    }

    // Show the filter modal
    const showFilterModal = () => {
        setModalVisible(true)
    }

    const OffersFilter = () => (
        <View style={styles.filterContainer}>
            <Pressable onPress={() => setType('buy')} style={[styles.filterButton, { backgroundColor: type === 'buy' && theme.darkColors.success }]}>
                <Text style={[styles.filterLabel, { color: type === 'buy' ? theme.darkColors.background : theme.darkColors.almost_white }]}>
                    Compra
                </Text>
            </Pressable>
            <Pressable onPress={() => setType('sell')} style={[styles.filterButton, { backgroundColor: type === 'sell' && theme.darkColors.danger }]}>
                <Text style={[styles.filterLabel, { color: type === 'sell' ? theme.darkColors.background : theme.darkColors.almost_white }]} >
                    Venta
                </Text>
            </Pressable>
        </View>
    );

    return (
        <View style={globalStyles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <View style={{ flex: 1 }}>
                    <OffersFilter />
                </View>
                <Pressable onPress={showFilterModal} style={styles.filterIcon} >
                    <FontAwesome5 name='filter' size={16} style={{ color: theme.darkColors.almost_white }} />
                </Pressable>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={type === 'buy' ? buyOffers : sellOffers}
                    keyExtractor={(item) => item.uuid}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <P2POffer offer={item} navigation={navigation} />
                    )}
                />
            </View>

            <Modal
                isVisible={isModalVisible}
                animationIn={'slideInUp'}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}
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
                            isChecked={myOffers}
                        />
                    </View>

                    <QPButton title={'Aplicar'} onPress={() => setModalVisible(false)} />

                </View>

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: theme.darkColors.elevation,
    },
    filterButton: {
        flex: 1,
        borderRadius: 6,
        paddingVertical: 8,
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