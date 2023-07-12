import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../ui/Theme';
import ShopIndexScreen from '../Shop/ShopIndexScreen';

export default function ShopScreen() {

    return (
        <View style={globalStyles.container}>
            <ShopIndexScreen />
        </View>
    )
}