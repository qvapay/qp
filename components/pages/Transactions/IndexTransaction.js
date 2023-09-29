import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { globalStyles } from '../../ui/Theme';
import Transaction from '../../ui/Transaction';
import { getTransactions } from '../../../utils/QvaPayClient';
import QPSearchBar from '../../ui/QPSearchBar';

export default function IndexTransaction({ navigation }) {

    // Transactions state
    const [searchQuery, setSearchQuery] = useState('')
    const [transactions, setTransactions] = useState([])
    const [searchStatus, setSearchStatus] = useState('paid')

    // Load Transactions from API via useEffect using qvaPayClient
    const fetchTransactions = async () => {
        try {
            const params = { limit: 50, status: searchStatus, description: searchQuery };
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

    return (
        <View style={globalStyles.container}>

            <View style={{ marginBottom: 10, height: 40 }}>
                <QPSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onClose={() => setShowSearchBar(false)} />
            </View>

            <FlatList
                data={transactions}
                showsVerticalScrollIndicator={false}
                keyExtractor={(transaction) => transaction.uuid}
                renderItem={({ item }) => (
                    <Transaction key={item.uuid} transaction={item} navigation={navigation} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})