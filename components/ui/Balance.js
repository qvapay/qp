import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { textStyles, theme } from './Theme'

export default function Balance({ navigation, me = { balance: 0 } }) {

    // QvaPay Balance state
    const [showBalance, setShowBalance] = useState(true);

    // showBalance state persistence
    useEffect(() => {
        const storeBalance = async () => {
            try {
                await AsyncStorage.setItem('showBalance', JSON.stringify(showBalance));
            } catch (e) {
            }
        };
        storeBalance();
    }, [showBalance]);


    const add = () => { navigation.navigate('AddScreen') }
    const withdraw = () => { navigation.navigate('WithdrawScreen') }

    // Toggle for the pressable show real balance or just *****
    const toggleShowBalance = () => { setShowBalance(!showBalance) };
    const formatBalance = (balance) => { return showBalance ? parseFloat(balance).toFixed(2) : '*****' }

    return (
        <View style={styles.container}>

            <View style={styles.topLabels}>
                <Text style={styles.balanceHeader}>Balance QvaPay:</Text>
            </View>

            <View style={styles.topLabels}>
                <Pressable onPress={toggleShowBalance}>
                    <View>
                        <Text style={styles.balanceAmount}>$ {formatBalance(me.balance)}</Text>
                    </View>
                </Pressable>
                <Text style={styles.satsAmount}><FontAwesome5 name='bolt' size={16} color='#ff9f4390' /> {me.satoshis}</Text>
            </View>

            <View style={styles.actionButtons}>
                <Pressable style={styles.actionButton1} onPress={() => add()}>
                    <Text style={styles.actionButtonLabel}>
                        <FontAwesome5 name='arrow-down' size={16} color='white' /> Depositar
                    </Text>
                </Pressable>
                <View style={{ width: 3 }}></View>
                <Pressable style={styles.actionButton2} onPress={() => withdraw()}>
                    <Text style={styles.actionButtonLabel}>
                        <FontAwesome5 name='arrow-up' size={16} color='white' /> Extraer
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    topLabels: {
        marginTop: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    balanceAmount: {
        fontSize: 48,
        color: 'white',
        alignSelf: 'flex-start',
        fontFamily: "Rubik-Black",
    },
    satsAmount: {
        fontSize: 16,
        fontFamily: "Rubik-Medium",
        color: theme.darkColors.elevation_light,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    balanceHeader: {
        fontSize: 13,
        fontFamily: "Rubik-Light",
        color: theme.darkColors.elevation_light,
    },
    gray: {
        color: '#7f8c8d',
        fontSize: 14,
        fontFamily: "Rubik-Light",
    },
    actionButton1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        marginVertical: 20,
        backgroundColor: theme.darkColors.elevation,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    actionButton2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        marginVertical: 20,
        backgroundColor: theme.darkColors.elevation,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    actionButtonLabel: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Rubik-Bold",
    }
})