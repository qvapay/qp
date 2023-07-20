import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'
import Transaction from './Transaction'
import { getTransactions } from '../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Transactions({ navigation }) {

    // transactions State
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const fetchedTransactions = await getTransactions({ navigation });
            setTransactions(fetchedTransactions);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTransactions();
        const interval = setInterval(fetchTransactions, 120000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.transactionsDetails}>
                <Text style={[styles.white, styles.marginBottom]}>Transacciones:</Text>
                <Pressable onPress={() => navigation.navigate('TransactionStack', { screen: 'IndexTransaction' })}>
                    <Text style={styles.gray}>Más detalles <FontAwesome5 name='chevron-right' /></Text>
                </Pressable>
            </View>
            <TransactionsList transactions={transactions} navigation={navigation} />
        </View>
    );
}

function TransactionsList({ transactions, navigation }) {
    if (transactions.length === 0) return null;
    return transactions.map(({ uuid, ...props }) => (
        <Transaction
            key={uuid}
            transaction={props}
            navigation={navigation}
        />
    ));
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
    },
    transactionsDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    white: {
        color: 'white',
        fontSize: 14,
        fontFamily: "Rubik-Light",
    },
    gray: {
        color: '#8F9BB3',
        fontSize: 14,
        fontFamily: "Rubik-Light",
    }
})