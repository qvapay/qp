import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, Text, Pressable } from 'react-native'
import { globalStyles, textStyles } from '../../ui/Theme';
import { useNavigation } from '@react-navigation/native'
import { apiRequest } from '../../../utils/QvaPayClient';
import P2POffer from '../../ui/P2POffer';
import { theme } from '../../ui/Theme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function P2PIndex() {

    const navigation = useNavigation();
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    const [p2pOffers, setP2pOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [sellOffers, setSellOffers] = useState([]);
    const [isBuyEnabled, setIsBuyEnabled] = useState(true);

    // useEffect for Offers with getP2POffers
    useEffect(() => {
        getP2POffers()
    }, []);

    // function to retrieve offers from API
    const getP2POffers = async () => {
        try {
            setLoading(true)
            const url = `/p2p/index?type=${type}`
            const response = await apiRequest(url, { metthod: "GET" }, navigation)

            setP2pOffers(response.data)
            setBuyOffers(p2pOffers.filter((offer) => offer.type === 'buy'))
            setSellOffers(p2pOffers.filter((offer) => offer.type === 'sell'))


            setLoading(false)
        } catch (error) {
            console.error('Error fetching P2P Offers:', error);
        }
    }

    // Show the filter modal
    const showFilterModal = () => {
        console.log("Filter Modal")
    }

    const OffersFilter = ({ isBuyEnabled }) => (
        <View style={styles.filterContainer}>
            <Pressable onPress={() => setIsBuyEnabled(true)} style={[styles.filterButton, isBuyEnabled && styles.filterButtonActive]}>
                <Text style={[styles.filterLabel, isBuyEnabled && styles.filterLabelActive]}>
                    Compra
                </Text>
            </Pressable>
            <Pressable onPress={() => setIsBuyEnabled(false)} style={[styles.filterButton, !isBuyEnabled && styles.filterButtonActive]}>
                <Text style={[styles.filterLabel, !isBuyEnabled && styles.filterLabelActive]} >
                    Venta
                </Text>
            </Pressable>
        </View>
    );

    return (
        <View style={globalStyles.container}>

            {
                loading ? (
                    <View style={globalStyles.section}>
                        <Text style={textStyles.text}>Cargando operaciones...</Text>
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
    filterButtonActive: {
        backgroundColor: theme.darkColors.background,
    },
    filterLabel: {
        fontSize: 16,
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.placeholder,
    },
    filterLabelActive: {
        color: theme.darkColors.almost_white,
    },
    filterIcon: {
        padding: 10,
        marginLeft: 5,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
})