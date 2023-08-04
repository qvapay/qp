import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { globalStyles } from '../../ui/Theme';
import Transaction from '../../ui/Transaction';
import { getTransactions } from '../../../utils/QvaPayClient';
import QPSearchBar from '../../ui/QPSearchBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function IndexTransaction({ navigation }) {

    // Transactions state
    const [searchQuery, setSearchQuery] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [searchStatus, setSearchStatus] = useState('paid');
    const [refreshing, setRefreshing] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

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

    // Query latest transactions every 120 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchTransactions();
        }, 120000);
        return () => clearInterval(interval);
    }, []);

    // Swipe to Refresh
    const onRefresh = async () => {
        setShowSearchBar(true);
        setRefreshing(true);
        await fetchTransactions();
        setRefreshing(false);
    };

    return (
        <View style={globalStyles.container}>

            {
                showSearchBar && (
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <QPSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </View>
                        <FontAwesome5 name="filter" size={16} color="white" style={{ marginHorizontal: 5 }} />
                    </View>
                )
            }

            <FlatList
                data={transactions}
                showsVerticalScrollIndicator={false}
                keyExtractor={(transaction) => transaction.uuid}
                renderItem={({ item }) => (
                    <Transaction key={item.uuid} transaction={item} navigation={navigation} />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})