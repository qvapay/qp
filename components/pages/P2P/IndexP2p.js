import React from 'react'
import { StyleSheet } from 'react-native'
import P2POffer from '../../ui/P2POffer';
import { FlatList } from 'react-native-gesture-handler';

export default function IndexP2p({ offers }) {

    // Showing the Data
    const renderItem = ({ item }) => <P2POffer offer={item} />

    return (
        <FlatList
            data={offers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
})