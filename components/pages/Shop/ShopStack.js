import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShopItemScreen from './ShopItemScreen';
import ShopIndexScreen from './ShopIndexScreen';
import ShopCartScreen from './ShopCartScreen';
import ShopCheckoutScreen from './ShopCheckoutScreen';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function ShopStack() {

    return (
        <Stack.Navigator
            name="ShopStack"
            initialRouteName="ShopIndexScreen"
            screenOptions={{
                headerShown: true,
                animationDuration: 250,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="ShopIndexScreen" component={ShopIndexScreen} />

            <Stack.Screen
                name="ShopItemScreen"
                component={ShopItemScreen}
                options={{
                    headerTitle: '',
                    headerShown: false,
                    animationDuration: 250,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen name="ShopCartScreen" component={ShopCartScreen} />

            <Stack.Screen
                name="ShopCheckoutScreen"
                component={ShopCheckoutScreen}
                options={{
                    title: 'Finalizar Compra',
                    animationDuration: 250,
                    animation: 'slide_from_right',
                }}
            />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})