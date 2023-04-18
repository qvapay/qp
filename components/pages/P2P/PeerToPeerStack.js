import React from 'react'
import { StyleSheet } from 'react-native';
import ShowP2p from './ShowP2p';
import CreateP2p from './CreateP2p';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../ui/Theme';

export default function PeerToPeerStack() {

    // Stack Navigation
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            name="PeerToPeerStack"
            initialRouteName="ShowP2p"
            screenOptions={{
                title: '',
                headerStyle: {
                    backgroundColor: theme.darkColors?.background,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >

            <Stack.Screen
                name="ShowP2p"
                component={ShowP2p}
            />

            <Stack.Screen
                name="CreateP2p"
                component={CreateP2p}
            />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkColors?.background,
    },
    qrIconStyle: {
        color: '#fff',
        fontSize: 24,
    },
});