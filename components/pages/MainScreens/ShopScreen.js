import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../ui/Theme';
import ShopIndex from '../Shop/ShopIndex';

export default function ShopScreen({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <ShopIndex />
        </View>
    )
}