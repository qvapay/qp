import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'

import QPButton from '../../ui/QPButton';
import { AppContext } from '../../../AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import EncryptedStorage from 'react-native-encrypted-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePictureSection from '../../ui/ProfilePictureSection';

export default function SettingsMenu({ navigation }) {

    const { me } = useContext(AppContext);
    const version = '0.0.1';
    const versionUnixTimestamp = 1620000000;

    // Logout and Navigate to AuthStack
    const logout = () => {
        // Show a confirm dialog and then logout
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: () => {
                        // Logout and navigate to AuthStack
                        EncryptedStorage.removeItem("accessToken");
                        navigation.replace('AuthStack');
                    },
                },
            ],
            { cancelable: false }
        );
    }

    // Settings Items as an object of multiple dimensions:
    const settings = {
        general: {
            title: 'GENERAL',
            options: [
                {
                    title: 'Tema',
                    screen: 'Theme',
                },
            ],
        },
        account: {
            title: 'CUENTA',
            options: [
                {
                    title: 'Datos personales',
                    screen: 'PersonalData',
                },
                {
                    title: 'Idioma',
                    screen: 'Language',
                },
            ],
        },
        security: {
            title: 'SEGURIDAD',
            options: [
                {
                    title: 'Cambiar contraseña',
                    screen: 'ChangePassword',
                },
                {
                    title: 'Autenticación de dos factores',
                    screen: 'TwoFactorAuthentication',
                },
            ],
        },
        notifications: {
            title: 'NOTIFICACIONES',
            options: [
                {
                    title: 'Configuración de notificaciones',
                    screen: 'NotificationSettings',
                },
            ],
        },
        payment_methods: {
            title: 'AJUSTES DE PAGO',
            options: [
                {
                    title: 'Métodos de pago',
                    screen: 'CreditCards',
                },
                {
                    title: 'Contactos favoritos',
                    screen: 'FavoriteContacts',
                },
                {
                    title: 'Límites',
                    screen: 'LimitsSettings',
                },
            ],
        }
    }

    const SettingsItemSection = ({ section }) => {
        return (
            <View style={styles.box}>
                <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>{section.title}</Text>
                {section.options.map((option, index) => (
                    <SettingsItemSectionItem
                        key={index}
                        title={option.title}
                        onPress={() => navigation.navigate(option.screen)}
                    />
                ))}
            </View>
        );
    };

    const SettingsItemSectionItem = ({ title, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.item}>
                <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff' }}>{title}</Text>
                <FontAwesome5 name="angle-right" size={16} style={{ color: '#fff' }} />
            </TouchableOpacity>
        );
    };


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center' }} >

            <View style={styles.box}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <FontAwesome5 name="qrcode" size={14} style={{ color: '#fff' }} onPress={() => navigation.navigate('ScanScreen')} />
                    <FontAwesome5 name="share-square" size={14} style={{ color: '#fff' }} />
                </View>

                <View>
                    <ProfilePictureSection user={me} />
                </View>

                <View>
                    <QPButton
                        title="Editar Perfil"
                        buttonStyle={{ marginBottom: 0 }}
                        onPress={() => navigation.navigate('PersonalData')}
                    />
                </View>

            </View>

            {/* Referal invitation Card */}
            <TouchableOpacity style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} onPress={() => navigation.navigate('ReferalInvitation')}>
                <View style={{ marginRight: 20 }}>
                    <FontAwesome5 name="gift" size={24} style={{ color: '#fff' }} />
                </View>
                <View>
                    <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>INVITAR AMIGOS</Text>
                    <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>Invita a tus amigos y gana dinero</Text>
                </View>
            </TouchableOpacity>

            {Object.values(settings).map((section, index) => (
                <SettingsItemSection key={index} section={section} />
            ))}

            <QPButton buttonStyle={{ backgroundColor: '#ea5455' }} onPress={logout} >
                <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16 }}>Cerrar Sesión</Text>
            </QPButton>

            {/* Github, Twitter and Instagram accounts */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                <FontAwesome5 name="github" size={24} style={{ color: '#fff' }} />
                <FontAwesome5 name="twitter" size={24} style={{ color: '#fff' }} />
                <FontAwesome5 name="instagram" size={24} style={{ color: '#fff' }} />
            </View>

            <Text style={styles.copyBottom}>
                {`QvaPay © 2023 \n`}
                {`v ${version} (${versionUnixTimestamp}) \n`}
                {`Todos los derechos reservados \n`}
            </Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#161d31',
    },
    box: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#283046',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    copyBottom: {
        flexDirection: 'row',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
})