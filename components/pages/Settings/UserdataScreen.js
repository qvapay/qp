import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { globalStyles, textStyles } from '../../ui/Theme'
import QPButton from '../../ui/QPButton'
import { AppContext } from '../../../AppContext';
import AvatarPicture from '../../ui/AvatarPicture';
import { useNavigation } from '@react-navigation/native';
import { updateUserData } from '../../../utils/QvaPayClient'
import QPInput from '../../ui/QPInput';
import LottieView from "lottie-react-native";
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { uploadProfilePicture } from '../../../utils/QvaPayClient';

export default function UserdataScreen() {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [name, setName] = useState(me.name)
    const [lastname, setLastname] = useState(me.lastname)
    const [username, setUsername] = useState(me.username)
    const [bio, setBio] = useState(me.bio)
    const [email] = useState(me.email)
    const [error, setError] = useState('')
    const [sending, setSending] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const updateData = async () => {
        setSending(true);
        try {
            const response = await updateUserData({ data: { name, lastname, username, bio, phone }, navigation })
            if (response.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Datos actualizados correctamente',
                    position: 'bottom',
                    bottomOffset: 10,
                });
            } else {
                setError('Error al actualizar los datos');
            }
        } catch (error) {
            console.error(`Error in Update: ${error}`);
        } finally {
            setSending(false);
        }
    }

    // Image picker from gallery
    const updatePicture = async () => {
        const options = {
            title: 'Seleccionar foto de perfil',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Usuario canceló la selección de imagen.');
            } else if (response.errorMessage) {
                console.log('Error al seleccionar la imagen: ', response.errorMessage);
            } else {
                setUploadingAvatar(true);
                const source = { uri: response.assets[0].uri };
                uploadProfilePicture({ imageUri: source.uri }).then((result) => {
                    if (result && result.status === 201) {
                        Toast.show({
                            type: 'success',
                            text1: 'Foto de perfil actualizada correctamente',
                            position: 'bottom',
                            bottomOffset: 10,
                        });
                        // Update the new profile picture in the context
                        me.profile_photo_url = "https://media.qvapay.com/" + result.data.path;
                    } else {
                        setError('Error al actualizar la foto de perfil');
                    }
                }).catch((error) => {
                    console.error(`Error in Update: ${error}`);
                }).finally(() => {
                    setUploadingAvatar(false);
                });
            }
        });
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <ScrollView>

                <View style={styles.userDataSection}>

                    <TouchableOpacity onPress={updatePicture} style={styles.avatarContainer}>
                        <AvatarPicture size={76} source_uri={me.profile_photo_url} showBadge={false} rating={me.average_rating} vip={me.vip} />
                        {uploadingAvatar && <LottieView source={require('../../../assets/lotties/spiner.json')} autoPlay loop style={styles.loadingAnimation} />}
                        <View style={[styles.editIcon, { width: 84, height: 84, backgroundColor: '#FFFFFF20', borderRadius: 42 }]}>
                            <FontAwesome5 name="camera" size={30} color="#FFFFFFC0" style={{ position: 'absolute', bottom: 26, right: 26 }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={styles.fullNameView}>
                            <Text style={{ ...globalStyles.fullName }}>{name} {lastname}</Text>
                            {me.golden_check == 1 && (<Image source={require('../../../assets/images/gold-badge.png')} style={{ marginLeft: 8, height: 20, width: 20 }} />)}
                        </View>
                        <Text style={styles.usernameText}>@{me.username}</Text>
                    </View>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <Text style={textStyles.h1}>Datos de usuario:</Text>
                    <QPInput prefixIconName='user' placeholder='Nombre de Usuario' value={username} onChangeText={(username) => setUsername(username)} />
                    <QPInput prefixIconName='id-card' placeholder='Nombre' value={name} onChangeText={(name) => setName(name)} />
                    <QPInput prefixIconName='id-card' placeholder='Apellido' value={lastname} onChangeText={(lastname) => setLastname(lastname)} />
                    <QPInput prefixIconName='signature' placeholder='Bio' value={bio} onChangeText={(bio) => setBio(bio)} multiline />
                    <QPInput prefixIconName='at' placeholder='Correo Electrónico' value={email} editable={false} />
                </View>

            </ScrollView>

            <QPButton title="Actualizar" onPress={updateData} />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    userDataSection: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    fullNameView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    usernameText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Rubik-Medium',
    },
    avatarContainer: {
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    loadingAnimation: {
        position: 'absolute',
        width: 250,
        height: 250,
        bottom: -83,
        right: -83,
    }
})