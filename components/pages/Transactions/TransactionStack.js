import React from 'react'
import ShowTransaction from './ShowTransaction';
import IndexTransaction from './IndexTransaction';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function TransactionStack() {

    // Stack Navigation
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            name="TransactionStack"
            initialRouteName="IndexTransaction"
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