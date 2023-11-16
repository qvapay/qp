import React from 'react'
import TransactionShow from './TransactionShow';
import TransactionIndex from './TransactionIndex';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function TransactionStack() {

    return (
        <Stack.Navigator
            name="TransactionStack"
            initialRouteName="TransactionIndex"
            screenOptions={{
                headerShadowVisible: false,
            }}
        >

            <Stack.Screen
                name="TransactionIndex"
                component={TransactionIndex}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="TransactionShow"
                component={TransactionShow}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}