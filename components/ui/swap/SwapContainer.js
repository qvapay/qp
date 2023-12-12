import React, { useContext } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native'
import { theme, textStyles } from '../Theme'
import { AppContext } from '../../../AppContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { adjustNumber } from '../../../utils/Helpers'
import { SvgUri } from 'react-native-svg';

const SwapContainer = ({ editable = false, operation = '', setAmount, setDesiredAmount, amount = 0, desiredAmount = 0, coin = {}, setStep }) => {

    const { me } = useContext(AppContext)
    const { price, name, logo } = coin

    // onFocus if the value is 0.00, set it to empty
    const onFocus = (value, setter) => {
        if (value == "0.00") {
            setter("")
        }
    }

    // Now when the user unfocus the input, if it's empty, set it to 0.00
    const onBlur = (value, setter) => {
        if (value == "") {
            setter("0.00")
        }
    }

    return (
        <>
            <View style={[styles.offerContainer, { marginBottom: -8, paddingBottom: 15 }]}>

                <Text style={[textStyles.h4, { color: theme.darkColors.almost_white }]}>{operation == 'buy' ? 'Recibes:' : 'Pagas:'}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SvgUri width="32" height="32" uri={'https://qvapay.com/img/coins/qvapay.svg'} />
                            <Text style={styles.offerLabel}>USD</Text>
                        </View>
                        <Text style={styles.balanceAmount}>Balance: ${adjustNumber(me.balance)}</Text>
                    </View>

                    <View>
                        {
                            editable ? (
                                <TextInput
                                    value={amount}
                                    style={[styles.amount, { color: amount == "0.00" ? theme.darkColors.elevation_light : 'white' }]}
                                    keyboardType="numeric"
                                    onChangeText={setAmount}
                                    cursorColor='white'
                                    onFocus={() => { onFocus(amount, setAmount) }}
                                    onBlur={() => { onBlur(amount, setAmount) }}
                                />
                            ) : (
                                <Text style={styles.offerAmount}>${adjustNumber(amount)}</Text>
                            )
                        }
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                <FontAwesome5 name={operation == 'buy' ? 'chevron-circle-up' : 'chevron-circle-down'} size={20} style={{ color: theme.darkColors.almost_white }} />
            </View>

            <View style={[styles.offerContainer, { marginTop: -8, paddingBottom: 15 }]}>

                <Text style={[textStyles.h4, { color: theme.darkColors.almost_white }]}>{operation == 'buy' ? 'Pagas:' : 'Recibes:'}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Pressable onPress={() => { setStep(2) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <SvgUri width="32" height="32" uri={'https://qvapay.com/img/coins/' + coin.logo + '.svg'} />
                            <Text style={styles.offerLabel}>{coin.tick}</Text>
                        </View>
                        <Text style={styles.balanceAmount}>Precio: ${adjustNumber(price)}</Text>
                    </Pressable>

                    <View>
                        {
                            editable ? (
                                <TextInput
                                    value={desiredAmount}
                                    style={[styles.amount, { color: desiredAmount == "0.00" ? theme.darkColors.elevation_light : 'white' }]}
                                    keyboardType="numeric"
                                    onChangeText={setDesiredAmount}
                                    cursorColor='white'
                                    onFocus={() => { onFocus(desiredAmount, setDesiredAmount) }}
                                    onBlur={() => { onBlur(desiredAmount, setDesiredAmount) }}
                                />
                            ) : (
                                <Text style={styles.offerReceive}>${adjustNumber(desiredAmount)}</Text>
                            )
                        }
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
        marginHorizontal: 10,
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.almost_white,
    },
    offerAmount: {
        fontSize: 26,
        marginLeft: 10,
        fontFamily: 'Rubik-Bold',
        color: theme.darkColors.almost_white,
    },
    balanceAmount: {
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'Rubik-Medium',
        color: theme.darkColors.elevation_light,
    },
    offerReceive: {
        fontSize: 26,
        marginLeft: 10,
        fontFamily: 'Rubik-Bold',
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
    },
    amount: {
        fontSize: 30,
        marginLeft: 10,
        marginVertical: 10,
        fontFamily: 'Rubik-Black',
        color: theme.darkColors.almost_white,
    },
})

export default SwapContainer