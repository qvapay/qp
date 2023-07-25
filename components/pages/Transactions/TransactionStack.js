import React from 'react'
import ShowTransaction from './ShowTransaction';
import IndexTransaction from './IndexTransaction';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function TransactionStack() {

    return (
        <Stack.Navigator
            name="TransactionStack"
            initialRouteName="IndexTransaction"
            screenOptions={{
                headerShadowVisible: false,
            }}
        >

            <Stack.Screen
                name="IndexTransaction"
                component={IndexTransaction}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ShowTransaction"
                component={ShowTransaction}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}