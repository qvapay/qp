import React, { useContext } from 'react'
import { StyleSheet, View, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../../ui/BottomBar';
import P2pScreen from './P2pScreen';
import HomeScreen from './HomeScreen';
import StoreScreen from './StoreScreen';
import KeypadScreen from './KeypadScreen';
import LightningScreen from './LightningScreen';

// UI Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AvatarPicture from '../../ui/AvatarPicture';

// Theming App
import { theme } from '../../ui/Theme';

// AppContext
import { AppContext } from '../../../AppContext';

export default function MainStack() {

    // Get the user me object from AppContext
    const { me } = useContext(AppContext);

    // Create the Bottom Tab Navigator
    const Tab = createBottomTabNavigator();

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
                    <Pressable onPress={() => navigation.navigate("SettingsScreen")}>
                        <View style={styles.avatarPicture}>
                            <AvatarPicture
                                size={32}
                                source_uri={me.profile_photo_url}
                            />
                        </View>
                    </Pressable>
                ),
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="P2pScreen" component={P2pScreen} />
            <Tab.Screen name="KeypadScreen" component={KeypadScreen} />
            <Tab.Screen name="LightningScreen" component={LightningScreen} />
            <Tab.Screen name="StoreScreen" component={StoreScreen} />
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