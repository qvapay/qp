import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EncryptedStorage from "react-native-encrypted-storage";

import BottomBar from '../../ui/BottomBar';
import P2pScreen from './P2pScreen';
import HomeScreen from './HomeScreen';
import ShopScreen from './ShopScreen';
import KeypadScreen from './KeypadScreen';
import LightningScreen from './LightningScreen';

// UI Components
import AvatarPicture from '../../ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Theming App
import { theme } from '../../ui/Theme';

// AppContext
import { AppContext } from '../../../AppContext';

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function MainStack() {

    // Get the user me object from AppContext
    const { me } = useContext(AppContext);

    // Check if there is a 2faRequired setting on EncryptedStorage
    useEffect(() => {
        const check2faRequired = async () => {
            const twoFactorRequired = await EncryptedStorage.getItem('2faRequired');
            if (twoFactorRequired == 'true') {
                navigation.navigate('TwoFactorScreen');
            }
        }
        check2faRequired();
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            backBehavior='initialRoute'
            tabBar={props => <BottomBar {...props} />}
            screenOptions={({ navigation }) => ({
                headerTitle: '',
                headerShown: true,
                headerBackVisible: true,
                headerBackTitleVisible: false,
                headerBackButtonMenuEnabled: false,
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: theme.darkColors?.background,
                },
                headerLeft: () => (
                    <FontAwesome5
                        name={'qrcode'}
                        style={styles.qrIconStyle}
                        onPress={() => navigation.navigate('ScanScreen')}
                    />
                ),
                headerRight: () => (
                    <Pressable
                        onPress={() => navigation.navigate("SettingsStack")}
                        onLongPress={() => navigation.navigate("SettingsStack", { screen: 'UserdataScreen' })}
                    >
                        <View style={styles.avatarPicture}>
                            <AvatarPicture size={28} source_uri={me.profile_photo_url} />
                        </View>
                    </Pressable>
                ),
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="P2pScreen" component={P2pScreen} />
            <Tab.Screen name="KeypadScreen" component={KeypadScreen} />
            <Tab.Screen name="LightningScreen" component={LightningScreen} />
            <Tab.Screen name="ShopScreen" component={ShopScreen} />
        </Tab.Navigator>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkColors?.background,
    },
    qrIconStyle: {
        color: '#fff',
        fontSize: 24,
        marginLeft: 20,
    },
    avatarPicture: {
        marginRight: 20,
    }
});