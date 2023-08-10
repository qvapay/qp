import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopItemScreen from './ShopItemScreen';
import ShopIndexScreen from './ShopIndexScreen';
import ShopCartScreen from './ShopCartScreen';
import ShopCheckoutScreen from './ShopCheckoutScreen';
import MyPurchasesScreen from './MyPurchasesScreen';
import { theme } from '../../ui/Theme';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function ShopStack() {

    return (
        <Stack.Navigator
            name="ShopStack"
            initialRouteName="ShopIndexScreen"
            screenOptions={{
                headerShown: false,
                animationDuration: 250,
                animation: 'slide_from_right',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: theme.darkColors.background,
                },
                headerShadowVisible: false,
            }}
        >

            <Stack.Screen
                name="ShopIndexScreen"
                component={ShopIndexScreen}
            />

            <Stack.Screen name="ShopCartScreen" component={ShopCartScreen} />

            <Stack.Screen
                name="MyPurchasesScreen"
                component={MyPurchasesScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ShopItemScreen"
                component={ShopItemScreen}
                options={{
                    headerTitle: '',
                    animationDuration: 250,
                    animation: 'slide_from_right',
                }}
            />

            <Stack.Screen
                name="ShopCheckoutScreen"
                component={ShopCheckoutScreen}
                options={{
                    title: 'Finalizar Compra',
                    headerTitleAlign: 'center',
                    headerShown: true,
                    animationDuration: 250,
                    animation: 'slide_from_right',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#161d31',
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontFamily: 'Rubik-Regular',
                    },
                    headerShadowVisible: false,
                }}
            />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})