import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, TextInput } from 'react-native'
import { globalStyles } from '../../ui/Theme';
import Transaction from '../../ui/Transaction';
import { getTransactions } from '../../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SearchTransactionBar = (({ searchQuery, setSearchQuery }) => (
    <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
            <FontAwesome5 name='search' size={12} color='#7f8c8d' />
            <TextInput
                placeholder="Buscar"
                style={[styles.searchBarText, { paddingVertical: 6 }]}
                placeholderTextColor="#7f8c8d"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
        </View>
    </View>
));

export default function IndexTransaction({ navigation }) {

    // Transactions state
    const [searchQuery, setSearchQuery] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [searchStatus, setSearchStatus] = useState('paid');

    // Load Transactions from API via useEffect using qvaPayClient
    const fetchTransactions = async () => {
        try {
            const params = {
                limit: 50,
                status: searchStatus,
                description: searchQuery
            };
            const transactions = await getTransactions({ ...params, navigation });
            setTransactions(transactions);
        } catch (error) {
            console.error(error);
        }
    }

    // Load transactions from API via useEffect using qvaPayClient
    useEffect(() => {
        fetchTransactions();
    }, [searchQuery, searchStatus]);

    // Query latest transactions every 120 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTransactions();
        }, 120000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={globalStyles.container}>

            <SearchTransactionBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <FlatList
                data={transactions}
                showsVerticalScrollIndicator={false}
                keyExtractor={(transaction) => transaction.uuid}
                renderItem={({ item }) => (
                    <Transaction
                        key={item.uuid}
                        transaction={item}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    searchBarText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        textTransform: 'none',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})