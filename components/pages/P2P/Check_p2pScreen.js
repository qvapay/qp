import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import IndexP2p from './P2PIndex'
import { globalStyles } from '../../ui/Theme'
import { getP2POffers } from '../../../utils/QvaPayClient'
import { theme } from '../../ui/Theme'

export default function P2pScreen({ navigation }) {

    const [buyoffers, setBuyoffers] = useState([]);
    const [selloffers, setSelloffers] = useState([]);
    const [isSellEnabled, setIsSellEnabled] = useState(false);

    // useEffect for Offers with getP2POffers
    useEffect(() => {
        const getOffers = async () => {
            const buyOffers = await getP2POffers({ type: 'buy', navigation });
            setBuyoffers(buyOffers);
            const sellOffers = await getP2POffers({ type: 'sell', navigation });
            setSelloffers(sellOffers);
        }
        getOffers();
    }, []);

    const OffersFilter = ({ isSellEnabled, onToggle }) => (
        <View style={styles.filterContainer}>
            <Pressable
                style={[styles.filterButton, !isSellEnabled && styles.filterButtonActive]}
                onPress={() => onToggle(false)}
            >
                <Text style={[styles.filterLabel, !isSellEnabled && styles.filterLabelActive]}>
                    Compra
                </Text>
            </Pressable>
            <Pressable
                style={[styles.filterButton, isSellEnabled && styles.filterButtonActive]}
                onPress={() => onToggle(true)}
            >
                <Text style={[styles.filterLabel, isSellEnabled && styles.filterLabelActive]} >
                    Venta
                </Text>
            </Pressable>
        </View>
    );

    return (
        // <View style={[globalStyles.container]}>
        //     <OffersFilter isSellEnabled={isSellEnabled} onToggle={(value) => setIsSellEnabled(value)} />
        //     <IndexP2p offers={(isSellEnabled ? selloffers : buyoffers)} navigation={navigation} />
        // </View>
        <View style={[globalStyles.container, { alignItems: 'center' }]}>
            <Text style={globalStyles.title}>Coming Soon... ⚡️</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        padding: 6,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#111626',
        justifyContent: 'space-evenly',
    },
    filterButton: {
        flex: 1,
        padding: 3,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButtonActive: {
        backgroundColor: theme.darkColors.background,
    },
    filterLabel: {
        fontSize: 16,
        color: '#7f8c8d',
        fontFamily: 'Rubik-Regular'
    },
    filterLabelActive: {
        color: 'white',
    },
})