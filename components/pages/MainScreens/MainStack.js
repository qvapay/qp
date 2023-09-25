import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../../ui/BottomBar';

// MainStack Screens
import P2pScreen from './P2pScreen';
import HomeScreen from './HomeScreen';
import KeypadScreen from './KeypadScreen';
import LightningScreen from './LightningScreen';

import AvatarPicture from '../../ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { useNavigation } from '@react-navigation/native';

// ShopStack
import ShopStack from '../Shop/ShopStack';
import QPRoundButton from '../../ui/QPRoundButton';

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function MainStack() {

    const navigation = useNavigation();
    const { me, setBackgroundColor } = useContext(AppContext);

    // Set the status bar to light
    useEffect(() => {
        setBackgroundColor(theme.darkColors?.background);
    }, []);

    // if {me} id undefined the go to Splash Screen
    useEffect(() => {
        if (!me) {
            navigation.navigate('SplashScreen');
        }
    }, [me, navigation]);


    // Go to MyPurchasesScreen via navigation using ShopStack
    const gotoMyPurchases = () => {
        navigation.navigate('ShopStack', { screen: 'MyPurchasesScreen' });
    };

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            backBehavior='initialRoute'
            tabBar={
                props => <BottomBar {...props} />
            }
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
                    <FontAwesome5 name={'qrcode'} style={styles.qrIconStyle} onPress={() => navigation.navigate('ScanScreen')} />
                ),
                headerRight: () => (
                    me && me.name && me.username ? (
                        <Pressable
                            style={styles.headerRight}
                            onPress={() => navigation.navigate("SettingsStack")}
                            onLongPress={() => navigation.navigate('SettingsStack', { screen: 'UserdataScreen' })}
                        >
                            <View style={styles.headerWelcome}>
                                <Text style={styles.headerRightText}>Hola {`${me.name}`}!</Text>
                                <Text style={styles.handleText}>@{`${me.username}`}</Text>
                            </View>
                            <AvatarPicture size={32} source_uri={me.profile_photo_url} />
                        </Pressable>
                    ) : null
                ),
            })}
        >

            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="P2pScreen" component={P2pScreen} />
            <Tab.Screen name="KeypadScreen" component={KeypadScreen} />
            <Tab.Screen name="LightningScreen" component={LightningScreen} />

            <Tab.Screen
                name="ShopStack"
                component={ShopStack}
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <FontAwesome5 name={'qrcode'} style={styles.qrIconStyle} onPress={() => navigation.navigate('ScanScreen')} />
                    ),
                    headerRight: () => (
                        <View style={styles.headerRight}>
                            <QPRoundButton size={14} icon={'shopping-cart'} style={{ marginRight: 10 }} onPress={gotoMyPurchases} />
                            {
                                me.name && me.username ? (
                                    <Pressable onPress={() => navigation.navigate("SettingsStack")} >
                                        <AvatarPicture size={32} source_uri={me.profile_photo_url} />
                                    </Pressable>
                                ) : null
                            }
                        </View>
                    ),
                }}
            />

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
        color: 'white',
        fontSize: 28,
        marginLeft: 20
    },
    headerRight: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerWelcome: {
        marginRight: 10,
        alignItems: 'flex-end',
    },
    headerRightText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular'
    },
    handleText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Rubik-Bold'
    },
});