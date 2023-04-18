import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import IndexP2p from '../P2P/IndexP2p'
import { globalStyles } from '../../ui/Theme'
import { getP2POffers } from '../../../utils/QvaPayClient'

export default function P2pScreen({ navigation }) {

    const [buyoffers, setBuyoffers] = useState([]);
    const [selloffers, setSelloffers] = useState([]);
    const [isSellEnabled, setIsSellEnabled] = useState(false);

    // useEffect for Buy Offers with getP2POffers({type = 'buy'})
    useEffect(() => {
        const getOffers = async () => {
            const offers = await getP2POffers({ type: 'buy', navigation });
            setBuyoffers(offers);
        }
        getOffers();
    }, []);

    // useEffect for Sell Offers with getP2POffers({type = 'sell'})
    useEffect(() => {
        const getOffers = async () => {
            const offers = await getP2POffers({ type: 'sell', navigation });
            setSelloffers(offers);
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
        <View style={[globalStyles.container, { paddingHorizontal: 0 }]}>
            <OffersFilter
                isSellEnabled={isSellEnabled}
                onToggle={(value) => setIsSellEnabled(value)}
            />
            <IndexP2p offers={(isSellEnabled ? selloffers : buyoffers)} />
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        padding: 6,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
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
        backgroundColor: '#161d31',
    },
    filterLabel: {
        fontSize: 16,
        color: '#7f8c8d',
        fontFamily: 'Nunito-Regular'
    },
    filterLabelActive: {
        color: 'white',
    },
})