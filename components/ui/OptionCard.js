import React from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { SvgUri } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const cardSize = (screenWidth - 24 * 2 - 5) / 3;

export default function OptionCard({ item, onPress, selected }) {

    // Format price with only 2 decimals
    const formatPrice = (price) => {
        return parseFloat(price).toFixed(2);
    }

    return (
        <Pressable style={[styles.cardContainer, selected ? styles.cardSelected : styles.cardUnselected]} onPress={onPress} >
            <View style={{ width: 48, height: 48 }}>
                <SvgUri width="48" height="48" uri={`https://qvapay.com/img/coins/${item.logo}.svg`} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.coinText}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.cardSubText}>{formatPrice(item.price)}</Text>
                    <Text style={styles.cardSubText}>{item.fee_in}%</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 8,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#283046',
        width: cardSize,
        height: cardSize,
    },
    cardContent: {
        flex: 1,
        alignContent: 'flex-end',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
    },
    cardSelected: {
        borderColor: '#7367f0',
    },
    cardUnselected: {
        borderColor: 'transparent',
    },
    coinText: {
        fontSize: 13,
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Nunito-Bold'
    },
    cardSubText: {
        fontSize: 10,
        color: 'gray',
        fontFamily: 'Nunito-Light'
    },
})