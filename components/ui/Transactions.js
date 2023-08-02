import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'
import Transaction from './Transaction'
import { getTransactions } from '../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Transactions({ navigation }) {

    // Transactions State
    const [transactions, setTransactions] = useState([]);

    // Create a flag to know if the component is mounted
    const isMounted = useRef(true);

    // Query latest transactions every 120 seconds
    useEffect(() => {
        isMounted.current = true;
        fetchTransactions();
        
        const interval = setInterval(() => {
            if (isMounted.current) {
                fetchTransactions();
            }
        }, 120000);

        return () => {
            isMounted.current = false;
            clearInterval(interval);
        };
    }, []);

    const fetchTransactions = async () => {
        try {
            const transactions = await getTransactions({ navigation });
            setTransactions(transactions);
        } catch (error) {
            console.error(error);
        }
    }

    const TransactionsList = () => {
        if (transactions && transactions.length > 0) {
            return transactions.map((transaction) => (
                <Transaction
                    key={transaction.uuid}
                    transaction={transaction}
                    navigation={navigation}
                />
            ));
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.transactionsDetails}>
                <Text style={[styles.white, { marginBottom: 10 }]}>Transacciones:</Text>
                <Pressable onPress={() => navigation.navigate('TransactionStack', { screen: 'IndexTransaction' })}>
                    <Text style={styles.gray}>Más detalles <FontAwesome5 name='chevron-right' /></Text>
                </Pressable>
            </View>
            <TransactionsList />
        </View>
    )
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