import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../../ui/BottomBar';
import P2pScreen from './P2pScreen';
import HomeScreen from './HomeScreen';
import ShopScreen from './ShopScreen';
import KeypadScreen from './KeypadScreen';
import LightningScreen from './LightningScreen';
import AvatarPicture from '../../ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { useNavigation } from '@react-navigation/native';

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function MainStack() {

    // get the navigation object from useNavigation hook
    const navigation = useNavigation();
    const { me } = useContext(AppContext);

    // if {me} id undefined the go to Splash Screen
    useEffect(() => {
        if (!me) {
            navigation.navigate('SplashScreen');
        }
    }, [me, navigation]);

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
                    <Pressable
                        onPress={
                            () => navigation.navigate("SettingsStack")
                        }
                        style={styles.headerRight}
                        onLongPress={
                            () => navigation.navigate('SettingsStack', {
                                screen: 'UserdataScreen'
                            })
                        }>
                        <View style={styles.headerWelcome}>
                            <Text style={styles.headerRightText}>Hola {`${me.name}`}!</Text>
                            <Text style={styles.handleText}>@{`${me.username}`}</Text>
                        </View>
                        <AvatarPicture size={32} source_uri={me.profile_photo_url} />
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
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular'
    },
    handleText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Rubik-Bold'
    },
});