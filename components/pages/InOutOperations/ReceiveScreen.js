import React from 'react'
import { View } from 'react-native'
import ProfileScreen from '../ProfileScreen';

export default function ReceiveScreen({ route }) {

    const amount = route.params?.amount || 0;

    return (
        <View style={{ flex: 1 }}>
            <ProfileScreen amount={amount} />
        </View>
    )
}