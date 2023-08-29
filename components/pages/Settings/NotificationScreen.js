import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, ScrollView, Switch, Image } from 'react-native'
import { globalStyles, textStyles, theme } from '../../ui/Theme'
import { OneSignal } from 'react-native-onesignal';
import { AppContext } from '../../../AppContext';
import { useNavigation } from '@react-navigation/native';
import { getCoins } from '../../../utils/QvaPayClient';
import { filterCoins } from '../../../utils/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen() {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledP2P, setIsEnabledP2P] = useState(false);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
    const [cryptoSubscriptions, setCryptoSubscriptions] = useState({});

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                const currentSubscriptions = JSON.parse(await AsyncStorage.getItem('cryptoSubscriptions') || '{}');
                setCryptoSubscriptions(currentSubscriptions);
            } catch (error) {
                console.error('Error al obtener las suscripciones:', error);
            }
        };
        const getOptions = async () => {
            try {
                const coins = await getCoins(navigation);
                const filteredCoins = filterCoins({ coins, in_out_p2p: "P2P" });
                setCryptoCurrencies(filteredCoins.cryptoCurrencies);
            } catch (error) {
                console.error('Error al obtener las monedas:', error);
            }
        };
        getOptions();
        getSubscriptions();
        getNotificationsState();
    }, []);

    // General Notifications
    const toggleSwitch = async () => {
        try {
            const hasPermission = await OneSignal.Notifications.hasPermission()
            if (!hasPermission) {
                // Prompt for push notification permissions
                const granted = await OneSignal.Notifications.canRequestPermission();
                if (granted) {
                    // Request for push notification permissions
                    const response = await OneSignal.Notifications.requestPermission(true);
                    setIsEnabled(response);
                } else {
                    // Cant request for permissions
                    setIsEnabled(false);
                }
            } else {
                // Disable notifications
                setIsEnabled(previousState => !previousState);
            }
        } catch (error) {
            console.error('Error al obtener el estado de las notificaciones:', error);
        }
    }

    console.log(cryptoSubscriptions)

    // P2P Offers
    const toggleSwitchP2P = async (cryptoName) => {

        const currentStatus = cryptoSubscriptions[cryptoName] || false;

        const updatedSubscriptions = { ...cryptoSubscriptions, [cryptoName]: !currentStatus };
        await AsyncStorage.setItem('cryptoSubscriptions', JSON.stringify(updatedSubscriptions));
        setCryptoSubscriptions(prev => ({ ...prev, [cryptoName]: !currentStatus }));

        // No olvides agregar o eliminar el tag en OneSignal según corresponda
        if (!currentStatus) {
            OneSignal.User.addTag(cryptoName, cryptoName);
        } else {
            OneSignal.User.removeTag(cryptoName);
        }
    }

    // Get the current notification state
    const getNotificationsState = async () => {
        try {
            const hasPermission = await OneSignal.Notifications.hasPermission()
            if (hasPermission) {
                setIsEnabled(true);
            }
        } catch (error) {
            console.error('Error al obtener el estado de las notificaciones:', error);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <ScrollView>
                <Text style={textStyles.h1}>Notificaciones</Text>

                <View style={styles.box}>
                    <View style={styles.settingPair}>
                        <Text style={textStyles.h6}>Notificaciones de pago</Text>
                        <Switch
                            value={isEnabled}
                            onValueChange={toggleSwitch}
                            ios_backgroundColor={theme.darkColors.elevation}
                            thumbColor={isEnabled ? theme.darkColors.primary : theme.darkColors.placeholder}
                            trackColor={{ false: theme.darkColors.primary, true: theme.darkColors.success }}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        />
                    </View>
                </View>

                <Text style={[textStyles.h2, { marginTop: 20 }]}>Alertas P2P:</Text>
                <View style={styles.box}>
                    <View style={styles.settingPair}>
                        <Text style={textStyles.h6}>Ofertas P2P</Text>
                        <Switch
                            value={cryptoSubscriptions["P2P_ALL"] || false}
                            onValueChange={() => toggleSwitchP2P("P2P_ALL")}
                            ios_backgroundColor={theme.darkColors.elevation}
                            thumbColor={isEnabledP2P ? theme.darkColors.primary : theme.darkColors.placeholder}
                            trackColor={{ false: theme.darkColors.primary, true: theme.darkColors.success }}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        />
                    </View>

                    {
                        cryptoCurrencies.map((cryptoCurrency, _) => (
                            <View
                                key={cryptoCurrency.id}
                                style={styles.settingPair}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../../assets/images/gold-badge.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
                                    <Text style={textStyles.h6}>{cryptoCurrency.name}</Text>
                                </View>
                                <Switch
                                    value={cryptoSubscriptions[cryptoCurrency.name] || false}
                                    onValueChange={() => toggleSwitchP2P(cryptoCurrency.name)}
                                    ios_backgroundColor={theme.darkColors.elevation}
                                    thumbColor={isEnabledP2P ? theme.darkColors.primary : theme.darkColors.placeholder}
                                    trackColor={{ false: theme.darkColors.primary, true: theme.darkColors.success }}
                                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                />
                            </View>
                        ))
                    }

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    box: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: theme.darkColors.elevation,
    },
    settingPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
})