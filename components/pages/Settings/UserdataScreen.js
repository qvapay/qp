import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import { globalStyles, textStyles } from '../../ui/Theme'
import QPButton from '../../ui/QPButton'
import { AppContext } from '../../../AppContext';
import { updateUserData } from '../../../utils/QvaPayClient'
import AvatarPicture from '../../ui/AvatarPicture';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import QPInput from '../../ui/QPInput';

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

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <ScrollView>

                <View style={styles.userDataSection}>
                    <AvatarPicture size={75} source_uri={me.profile_photo_url} showBadge={true} rating={me.average_rating} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={styles.fullNameView}>
                            <Text style={{ ...globalStyles.fullName }}>{name} {lastname}</Text>
                            {me.golden_check == 1 && (<Image source={require('../../../assets/images/gold-badge.png')} style={{ marginLeft: 8, marginTop: 3 }} />)}
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
    }
})