import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopItemScreen from './ShopItemScreen';
import ShopIndexScreen from './ShopIndexScreen';
import ShopCartScreen from './ShopCartScreen';
import ShopCheckoutScreen from './ShopCheckoutScreen';
import MyPurchasesScreen from './MyPurchasesScreen';

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
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="ShopIndexScreen" component={ShopIndexScreen} />
            
            <Stack.Screen name="ShopCartScreen" component={ShopCartScreen} />

            <Stack.Screen
                name="MyPurchasesScreen"
                component={MyPurchasesScreen}
                options={{
                    headerShown: true,
                    title: 'Mis Compras',
                    headerTintColor: '#fff',
                    animationDuration: 250,
                    headerTitleAlign: 'center',
                    animation: 'slide_from_right',
                    headerStyle: {
                        backgroundColor: '#161d31',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontFamily: 'Rubik-Regular',
                    },
                    headerShadowVisible: false,
                }}
            />

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

            <Stack.Screen
                name="ShopCheckoutScreen"
                component={ShopCheckoutScreen}
                options={{
                    title: 'Finalizar Compra',
                    headerTitleAlign: 'center',
                    headerShown: true,
                    animationDuration: 250,
                    animation: 'slide_from_right',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#161d31',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontFamily: 'Rubik-Regular',  // Cambia 'NombreDeTuFuente' por el nombre de tu fuente
                    },
                    headerShadowVisible: false,
                }}
            />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})