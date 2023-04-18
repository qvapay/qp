import React from 'react'
import P2POffer from '../../ui/P2POffer';
import { FlatList } from 'react-native-gesture-handler';

export default function IndexP2p({ offers, navigation }) {

    // Showing the Data
    const p2poffer = ({ item }) => <P2POffer offer={item} navigation={navigation} />

    return (
        <FlatList
            data={offers}
            renderItem={p2poffer}
            keyExtractor={(item) => item.uuid}
        />
    );
}