import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../../ui/BottomBar';
import P2pScreen from './P2pScreen';
import HomeScreen from './HomeScreen';
import StoreScreen from './StoreScreen';
import KeypadScreen from './KeypadScreen';
import LightningScreen from './LightningScreen';

export default function MainStack() {

    // Create the Bottom Tab Navigator
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBar={props => <BottomBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="P2pScreen" component={P2pScreen} />
            <Tab.Screen name="KeypadScreen" component={KeypadScreen} />
            <Tab.Screen name="LightningScreen" component={LightningScreen} />
            <Tab.Screen name="StoreScreen" component={StoreScreen} />
        </Tab.Navigator>
    )
}