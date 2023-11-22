import React, { useState, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { theme, textStyles } from '../Theme'
import { AppContext } from '../../../AppContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { adjustNumber } from '../../../utils/Helpers'
import { SvgUri } from 'react-native-svg';

const SwapContainer = ({ editable = false, operation = '', amount = 0, desiredAmount = 0, selectedCoin = 0, coin }) => {

    const { me } = useContext(AppContext)

    return (
        <>
            <View style={[styles.offerContainer, { marginBottom: -8 }]}>
                <Text style={[textStyles.h4, { color: theme.darkColors.elevation_light }]}>{operation == 'buy' ? 'Recibes:' : 'Pagas:'}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View>
                        <Text style={styles.offerAmount}>${adjustNumber(amount)}</Text>
                        <Text style={styles.balanceAmount}>Balance: ${adjustNumber(me.balance)}</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <SvgUri width="56" height="56" uri={'https://qvapay.com/img/coins/qvapay.svg'} />
                        <Text style={styles.offerLabel}>USD</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                <FontAwesome5 name={operation == 'buy' ? 'chevron-circle-up' : 'chevron-circle-down'} size={20} style={{ color: theme.darkColors.almost_white }} />
            </View>

            <View style={[styles.offerContainer, { marginTop: -8 }]}>
                <Text style={[textStyles.h4, { color: theme.darkColors.elevation_light }]}>{operation == 'buy' ? 'Pagas:' : 'Recibes:'}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.offerAmount}>${adjustNumber(desiredAmount)}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <SvgUri width="56" height="56" uri={'https://qvapay.com/img/coins/' + coin.logo + '.svg'} />
                        <Text style={styles.offerLabel}>{coin.tick}</Text>
                    </View>
                </View>
            </View>
        </>
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

export default SwapContainer