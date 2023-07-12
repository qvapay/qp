import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShopItemScreen from './ShopItemScreen';
import ShopIndexScreen from './ShopIndexScreen';
import ShopCartScreen from './ShopCartScreen';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function ShopStack() {

    return (
        <Stack.Navigator
            name="ShopStack"
            initialRouteName="ShopIndexScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ShopIndexScreen" component={ShopIndexScreen} />
            <Stack.Screen name="ShopItemScreen" component={ShopItemScreen} />
            <Stack.Screen name="ShopCartScreen" component={ShopCartScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})