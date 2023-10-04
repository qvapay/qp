import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './Theme'

export default function Balance({ navigation, me = { balance: 0 }, refreshing = false }) {

    const scale = new Animated.Value(1);
    const [showBalance, setShowBalance] = useState(true);
    const add = () => { navigation.navigate('AddScreen') }
    const withdraw = () => { navigation.navigate('WithdrawScreen') }
    const toggleShowBalance = () => { setShowBalance(!showBalance) };
    const formatBalance = (balance) => { return showBalance ? parseFloat(balance).toFixed(2) : '*****' }

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


    useEffect(() => {
        if (refreshing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1.05,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            scale.setValue(1);
        }
    }, [refreshing]);


    return (
        <View style={styles.container}>

            <View style={styles.topLabels}>
                <Text style={styles.balanceHeader}>Balance:</Text>
            </View>

            <View style={styles.topLabels}>
                <Pressable onPress={toggleShowBalance}>
                    <Animated.View style={[styles.amountContainer, { transform: [{ scale }] }]}>
                        <Text style={styles.dolarSign}>$</Text>
                        <Text style={styles.balanceAmount}>{formatBalance(me.balance)}</Text>
                        <Text style={styles.dolarTick}>USD</Text>
                    </Animated.View>
                </Pressable>
                <Text style={styles.satsAmount}><FontAwesome5 name='bolt' size={16} color='#ff9f4390' /> {me.satoshis}</Text>
            </View>

            <View style={styles.actionButtons}>
                <Pressable style={styles.actionButton1} onPress={() => add()}>
                    <FontAwesome5 name='arrow-down' size={16} color={theme.darkColors.elevation_light} style={{ marginRight: 5 }} />
                    <Text style={styles.actionButtonLabel}>Depositar</Text>
                </Pressable>
                <View style={{ width: 3 }}></View>
                <Pressable style={styles.actionButton2} onPress={() => withdraw()}>
                    <FontAwesome5 name='arrow-up' size={16} color={theme.darkColors.elevation_light} style={{ marginRight: 5 }} />
                    <Text style={styles.actionButtonLabel}>Extraer</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dolarSign: {
        fontSize: 30,
        marginRight: 5,
        fontFamily: "Rubik-ExtraBold",
        color: theme.darkColors.elevation_light,
    },
    dolarTick: {
        fontSize: 20,
        marginLeft: 5,
        fontFamily: "Rubik-ExtraBold",
        color: theme.darkColors.elevation_light,
    },
    topLabels: {
        marginTop: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    balanceAmount: {
        fontSize: 50,
        color: 'white',
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
        marginVertical: 10,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    actionButton2: {
        flex: 1,
        marginVertical: 10,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    actionButtonLabel: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: "Rubik-Bold",
    }
})