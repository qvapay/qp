import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from './Theme';
import { SvgUri } from 'react-native-svg';
import { adjustNumber } from '../../utils/Helpers';

export default function QPCoinRow({ item, in_out_p2p = "P2P", selectedCoin, setSelectedCoin, amount }) {

    const {
        id,
        name,
        tick,
        price,
        enabled_in,
        enabled_out,
        enabled_p2p,
        fee_in,
        fee_out,
        logo,
        max_in,
        max_out,
        min_in,
        min_out,
    } = item;

    // Conditional fee in/out/p2p
    const fee = () => {
        if (in_out_p2p === "IN") {
            return fee_in;
        } else if (in_out_p2p === "OUT") {
            return fee_out;
        } else {
            return "0";
        }
    }

    const handlePress = () => {
        setSelectedCoin(item.id)
    }

    return (
        <Pressable style={[styles.container, { overflow: 'hidden' }, { backgroundColor: selectedCoin == id ? theme.darkColors.primary : theme.darkColors.elevation }]} onPress={handlePress} disabled={amount < min_in || amount > max_out}>
            <View style={styles.coinLogo}>
                <SvgUri width="60" height="60" uri={`https://qvapay.com/img/coins/${item.logo}.svg`} />
            </View>
            <View style={styles.coinData}>
                
                <Text style={styles.coinName}>{name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.coinLimits}>{fee()}%</Text>
                </View>
            </View>
            <View style={styles.coinValues}>
                <Text style={styles.coinLimits}>{adjustNumber(amount / price)}</Text>
                <Text style={[styles.coinPrice]}>$ {adjustNumber(price)}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    coinLogo: {
        left: -5,
        width: 48,
        bottom: 5,
        height: 48,
        position: 'absolute',
    },
    coinData: {
        flex: 1,
        marginLeft: 60,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    coinName: {
        fontSize: 20,
        color: 'white',
        fontFamily: "Rubik-Medium",
    },
    coinTick: {
        fontSize: 14,
        fontFamily: "Rubik-SemiBold",
        color: theme.darkColors.placeholder,
    },
    coinValues: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    coinPrice: {
        fontSize: 16,
        color: 'white',
        fontFamily: "Rubik-Medium",
    },
    coinLimits: {
        fontSize: 12,
        fontFamily: "Rubik-Regular",
        color: theme.darkColors.placeholder,
    }
})