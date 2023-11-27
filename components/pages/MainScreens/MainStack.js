import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../../ui/Theme';
import BottomBar from '../../ui/BottomBar';
import { AppContext } from '../../../AppContext';
import QPRoundButton from '../../ui/QPRoundButton';
import AvatarPicture from '../../ui/AvatarPicture';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './HomeScreen';
import KeypadScreen from './KeypadScreen';
import LightningScreen from './LightningScreen';
import P2PStack from '../P2P/P2PStack';
import ShopStack from '../Shop/ShopStack';

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

    // Go to P2PCreate
    const gotoP2PCreate = () => {
        navigation.navigate('P2PStack', { screen: 'P2PCreate' });
    };

    const gotoP2PMyOffers = () => {
        navigation.navigate('P2PStack', { screen: 'P2PMyOffers' });
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
                            <AvatarPicture size={32} source_uri={me.profile_photo_url} vip={me.vip} />
                        </Pressable>
                    ) : null
                ),
            })}
        >

            <Tab.Screen name="HomeScreen" component={HomeScreen} />

            <Tab.Screen
                name="P2PStack"
                component={P2PStack}
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <QPRoundButton size={16} icon={'plus'} style={{ marginLeft: 10, marginTop: 10 }} onPress={gotoP2PCreate} />
                    ),
                    headerRight: () => (
                        <View style={styles.headerRight}>
                            {
                                me && me.p2p_enabled && me.p2p_enabled === 1 && (
                                    <>
                                        <QPRoundButton size={16} icon={'users'} onPress={gotoP2PMyOffers} />
                                    </>
                                )
                            }
                        </View>
                    ),
                }}
            />

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
                            <QPRoundButton size={16} icon={'shopping-cart'} onPress={gotoMyPurchases} />
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
        fontSize: 30,
        marginTop: 10,
        marginLeft: 10,
    },
    headerRight: {
        marginTop: 10,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
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