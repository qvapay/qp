import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext';
import { StyleSheet, Text, View, Alert } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage';
import QPButton from '../../ui/QPButton';
import { ScrollView } from 'react-native-gesture-handler';

// FontAwesome
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePictureSection from '../../ui/ProfilePictureSection';

export default function SettingsMenu({ navigation }) {

    const { me } = useContext(AppContext);

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

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center' }} >

            <View style={styles.box}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <FontAwesome5 name="qrcode" size={14} style={{ color: '#fff' }} />
                    <FontAwesome5 name="share-square" size={14} style={{ color: '#fff' }} />
                </View>

                <View>
                    <ProfilePictureSection user={me} />
                </View>

                <View>
                    <QPButton
                        title="Editar Perfil"
                    />
                </View>

            </View>

            <View style={styles.box}>

            </View>

            <View style={styles.box}>

            </View>

            <QPButton
                title="Ir a Detalles"
                onPress={() => navigation.navigate('SettingOption')}
            />

            <QPButton buttonStyle={{ backgroundColor: '#ea5455' }} onPress={logout} >
                <Text style={{ fontFamily: 'Nunito-Bold' }}>Cerrar Sesión</Text>
            </QPButton>

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
        paddingTop: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#283046',
    }
})