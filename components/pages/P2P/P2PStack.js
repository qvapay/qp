import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import P2PShow from './P2PShow';
import P2PIndex from './P2PIndex';
import P2PCreate from './P2PCreate';
import P2PMyOffers from './P2PMyOffers';

const Stack = createNativeStackNavigator();

export default function P2PStack() {

    return (
        <Stack.Navigator
            name="P2PStack"
            initialRouteName="P2PIndex"
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="P2PIndex" component={P2PIndex} />

            <Stack.Screen name="P2PShow" component={P2PShow} />

            <Stack.Screen name="P2PMyOffers" component={P2PMyOffers} />

            <Stack.Screen
                name="P2PCreate"
                component={P2PCreate}
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                }}
            />

        </Stack.Navigator>
    )
}