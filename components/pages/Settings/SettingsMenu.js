import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image, Alert, ScrollView, Linking } from 'react-native';
import QPButton from '../../ui/QPButton';
import { AppContext } from '../../../AppContext';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePictureSection from '../../ui/ProfilePictureSection';
import { theme } from '../../ui/Theme';

import OneSignal from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';

const SettingsMenu = () => {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const version = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();

    // default me data
    const {
        uuid = "",
        email = "",
        profile_photo_url = 'https://qvapay.com/android-chrome-192x192.png',
        name = "",
        lastname = "",
        username = "",
        kyc = 0,
        phone = "",
        golden_check = 0,
        average_rating = "0.0",
    } = me;

    useEffect(() => {
        getNotificationsState();
    }, []);

    const getNotificationsState = async () => {
        try {
            const deviceState = await OneSignal.getDeviceState();
            const { hasNotificationPermission, isSubscribed } = deviceState;
            OneSignal.setExternalUserId(uuid);
            OneSignal.setEmail(email);
        } catch (error) {
            console.error('Error al obtener el estado de las notificaciones:', error);
        }
    };

    const logout = async () => {
        const accessToken = await EncryptedStorage.getItem("accessToken");
        const twofaRequired = await EncryptedStorage.getItem("2faRequired");
        if (accessToken) {
            await EncryptedStorage.removeItem('accessToken');
        }
        if (twofaRequired) {
            await EncryptedStorage.removeItem('2faRequired');
        }
        // Go to Splash Screen
        navigation.replace('SplashScreen');
    };

    const confirmLogout = () =>
        Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres cerrar sesión?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Sí',
                onPress: logout,
            },
        ]);

    // Settings Items as an object of multiple dimensions:
    const settings = {
        general: {
            title: 'GENERAL',
            options: [
                {
                    title: 'Tema',
                    screen: 'ThemeScreen',
                    enabled: true,
                },
            ],
        },
        account: {
            title: 'CUENTA',
            options: [
                {
                    title: 'Datos personales',
                    screen: 'UserdataScreen',
                    enabled: true,
                },
                {
                    title: 'Idioma',
                    screen: 'LanguageScreen',
                    enabled: true,
                },
            ],
        },
        security: {
            title: 'SEGURIDAD',
            options: [
                {
                    title: 'Cambiar contraseña',
                    screen: 'PasswordScreen',
                    enabled: true,
                },
                {
                    title: 'Autenticación de dos factores',
                    screen: 'TwoFactorSettingsScreen',
                    enabled: true,
                },
            ],
        },
        notifications: {
            title: 'NOTIFICACIONES',
            options: [
                {
                    title: 'Configuración de notificaciones',
                    screen: 'NotificationScreen',
                    enabled: true,
                },
            ],
        },
        payment_methods: {
            title: 'AJUSTES DE PAGO',
            options: [
                {
                    title: 'Métodos de pago',
                    screen: 'PaymewntMethodsScreen',
                    enabled: true,
                },
                {
                    title: 'Contactos favoritos',
                    screen: 'FavoriteContactsScreen',
                    enabled: true,
                },
            ],
        }
    }

    const SettingsItemSection = ({ section }) => {
        return (
            <View style={styles.box}>
                <Text style={{ fontFamily: 'Rubik-Bold', color: '#fff', fontSize: 18, marginBottom: 10 }}>{section.title}</Text>
                {section.options.map((option, index) => (
                    <SettingsItemSectionItem
                        key={index}
                        title={option.title}
                        onPress={option.enabled ? () => navigation.navigate(option.screen) : () => { }}
                    />
                ))}
            </View>
        );
    };

    const SettingsItemSectionItem = ({ title, onPress }) => {
        return (
            <Pressable onPress={onPress} style={styles.item}>
                <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 18 }}>{title}</Text>
                <FontAwesome5 name="angle-right" size={16} style={{ color: '#fff' }} />
            </Pressable>
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center' }} >

            <View style={styles.box}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <FontAwesome5 name="qrcode" size={14} style={{ color: '#fff' }} onPress={() => navigation.navigate('ScanScreen')} />
                    <FontAwesome5 name="share-square" size={14} style={{ color: '#fff' }} onPress={() => navigation.navigate('ReceiveScreen')} />
                </View>
                <View>
                    <ProfilePictureSection user={me} />
                </View>
                <View>
                    <QPButton
                        title="Editar Perfil"
                        buttonStyle={{ marginBottom: 0 }}
                        onPress={() => navigation.navigate('UserdataScreen')}
                    />
                </View>
            </View>

            {/* GoldenCheck Card */}
            <Pressable
                style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]}
                onPress={() => navigation.navigate('GoldCheck')}
            >

                <View style={{ marginRight: 20 }}>
                    <Image
                        source={require('../../../assets/images/gold-badge.png')}
                        style={{ width: 28, height: 28 }}
                    />
                </View>
                <View>
                    <Text style={{ fontFamily: 'Rubik-Bold', color: '#fff', fontSize: 16 }}>GOLD CHECK</Text>
                    {
                        golden_check == 1
                            ? <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 14 }}>Ver mi suscripción</Text>
                            : <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 14 }}>Comprar GOLD Check</Text>
                    }
                </View>
            </Pressable>

            {/* Referal invitation Card */}
            <Pressable
                style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]}
                onPress={() => navigation.navigate('ReferalInvitation')}
            >
                <View style={{ marginRight: 20 }}>
                    <FontAwesome5 name="gift" size={24} style={{ color: '#fff' }} />
                </View>
                <View>
                    <Text style={{ fontFamily: 'Rubik-Bold', color: '#fff', fontSize: 16 }}>INVITAR AMIGOS</Text>
                    <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 14 }}>Invita a tus amigos y gana dinero</Text>
                </View>
            </Pressable>

            {Object.values(settings).map((section, index) => (
                <SettingsItemSection key={index} section={section} />
            ))}

            <QPButton buttonStyle={{ backgroundColor: '#ea5455' }} onPress={confirmLogout} >
                <Text style={{ fontFamily: 'Rubik-Bold', fontSize: 16 }}>Cerrar Sesión</Text>
            </QPButton>

            {/* Github, Twitter and Instagram accounts */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                <Pressable onPress={() => Linking.openURL('https://github.com/qvapay/qp')}>
                    <FontAwesome5 name="github" size={24} style={{ color: '#fff' }} />
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://twitter.com/qvapay')}>
                    <FontAwesome5 name="twitter" size={24} style={{ color: '#fff' }} />
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://instagram.com/qvapay')}>
                    <FontAwesome5 name="instagram" size={24} style={{ color: '#fff' }} />
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://qvapay.raiseaticket.com')}>
                    <FontAwesome5 name="headset" size={24} style={{ color: '#fff' }} />
                </Pressable>
            </View>

            <Text style={styles.copyBottom}>
                {`QvaPay © 2023 \n`}
                {`v ${version} b (${buildNumber})\n`}
                {`Todos los derechos reservados \n`}
            </Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.background
    },
    box: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: theme.darkColors.elevation,
    },
    item: {
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    copyBottom: {
        marginTop: 10,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        fontFamily: 'Rubik-Regular',
    }
})

export default SettingsMenu;