import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Balance({ navigation, me = { balance: 0 } }) {

    // QvaPay Balance state
    const [showBalance, setShowBalance] = useState(true);

    const add = () => {
        navigation.navigate('AddScreen');
    }

    const withdraw = () => {
        navigation.navigate('WithdrawScreen');
    }

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

    // Toggle for the pressable show real balance or just *****
    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    };

    // Balance microcomponent
    const formatBalance = (balance) => {
        return showBalance ? (balance % 1 === 0 ? balance + '.00' : balance) : '*****';
    }

    return (
        <View style={styles.container}>

            <View style={styles.topLabels}>
                <Text style={styles.white}>Balance QvaPay:</Text>
            </View>

            <View style={styles.topLabels}>
                <Pressable onPress={toggleShowBalance}>
                    <View>
                        <Text style={styles.balanceAmount}>$ {formatBalance(me.balance)}</Text>
                    </View>
                </Pressable>
                <View>
                    <Text style={styles.satsAmount}><FontAwesome5 name='bolt' size={16} color='yellow' /> {me.satoshis}</Text>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <Pressable style={styles.actionButton1} onPress={() => add()}>
                    <Text style={styles.actionButtonLabel}>
                        <FontAwesome5 name='arrow-down' size={16} color='#fff' /> Depositar
                    </Text>
                </Pressable>
                <View style={{ width: 3 }}></View>
                <Pressable style={styles.actionButton2} onPress={() => withdraw()}>
                    <Text style={styles.actionButtonLabel}>
                        <FontAwesome5 name='arrow-up' size={16} color='#fff' /> Extraer
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    topLabels: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    balanceAmount: {
        fontSize: 40,
        color: '#fff',
        alignSelf: 'flex-start',
        fontFamily: "Rubik-Black",
    },
    satsAmount: {
        fontSize: 20,
        color: '#fff',
        fontFamily: "Rubik-Bold",
    },
    actionButtons: {
        flexDirection: 'row',
    },
    white: {
        color: 'white',
        fontSize: 14,
        fontFamily: "Rubik-Light",
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
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Rubik-Bold",
    }
})