import React from 'react'
import { StatusBar, View } from 'react-native'
import ProfileScreen from '../ProfileScreen';

export default function ReceiveScreen({ route }) {

    const { amount } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <ProfileScreen amount={amount} />
        </View>
    )
}