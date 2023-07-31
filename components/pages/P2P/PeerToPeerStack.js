import React from 'react'
import ShowP2p from './ShowP2p';
import CreateP2p from './CreateP2p';
import { theme } from '../../ui/Theme';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack Navigation
const Stack = createNativeStackNavigator();

export default function PeerToPeerStack() {

    return (
        <Stack.Navigator
            name="PeerToPeerStack"
            initialRouteName="ShowP2p"
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="ShowP2p" component={ShowP2p} />
            <Stack.Screen name="CreateP2p" component={CreateP2p} />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkColors?.background,
    },
    qrIconStyle: {
        color: 'white',
        fontSize: 24,
    },
});