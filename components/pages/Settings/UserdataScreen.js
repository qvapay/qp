import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import { globalStyles, theme } from '../../ui/Theme'
import QPButton from '../../ui/QPButton'
import { AppContext } from '../../../AppContext';
import { updateUserData } from '../../../utils/QvaPayClient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AvatarPicture from '../../ui/AvatarPicture';
import { useNavigation } from '@react-navigation/native';

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
            if (response.status === 200) {
                // TODO Toast.show('Datos Actualizados', Toast.LONG);
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

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <AvatarPicture size={75} source_uri={me.profile_photo_url} showBadge={true} rating={me.average_rating} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={styles.fullNameView}>
                            <Text style={{ ...globalStyles.fullName }}>{name} {lastname}</Text>
                            {me.golden_check == 1 && (<Image source={require('../../../assets/images/gold-badge.png')} style={{ marginLeft: 8, marginTop: 3 }} />)}
                        </View>
                        <Text style={styles.usernameText}>@{me.username}</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ width: 48, alignItems: 'center' }}>
                        <FontAwesome5 name='user' size={24} style={{ color: 'white' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabelStyle}>Usuario:</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(username) => setUsername(username)}
                                underlineColorAndroid="#f000"
                                value={username}
                                placeholder="Nombre de Usuario"
                                placeholderTextColor="#7f8c8d"
                                autoCapitalize="words"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ width: 48, alignItems: 'center' }}>
                        <FontAwesome5 name='user-tag' size={24} style={{ color: 'white' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabelStyle}>Nombre:</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) => setName(name)}
                                underlineColorAndroid="#f000"
                                value={name}
                                placeholder="Nombre"
                                placeholderTextColor="#7f8c8d"
                                autoCapitalize="words"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ width: 48, alignItems: 'center' }}>
                        <FontAwesome5 name='users' size={24} style={{ color: 'white' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabelStyle}>Apellido:</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(lastname) => setLastname(lastname)}
                                underlineColorAndroid="#f000"
                                value={lastname}
                                placeholder="Apellido"
                                placeholderTextColor="#7f8c8d"
                                autoCapitalize="words"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ width: 48, alignItems: 'center' }}>
                        <FontAwesome5 name='signature' size={24} style={{ color: 'white' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabelStyle}>Bio:</Text>
                        <View style={[styles.sectionStyle, { height: 100, }]}>
                            <TextInput
                                style={[styles.inputStyle, { height: 100 }]}
                                onChangeText={(bio) => setBio(bio)}
                                underlineColorAndroid="#f000"
                                value={bio}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Bio de su perfil"
                                placeholderTextColor="#7f8c8d"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ width: 48, alignItems: 'center' }}>
                        <FontAwesome5 name='envelope' size={24} style={{ color: 'white' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabelStyle}>Email:</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                editable={false}
                                value={email}
                                underlineColorAndroid="#f000"
                                placeholder="Correo Electrónico"
                                placeholderTextColor="#7f8c8d"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>

            <QPButton title="Actualizar" onPress={updateData} />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionStyle: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: theme.darkColors.elevation,
        fontFamily: "Rubik-Regular",
    },
    inputLabelStyle: {
        fontSize: 14,
        color: '#7f8c8d',
        fontFamily: "Rubik-Regular",
    },
    errorTextStyle: {
        fontSize: 14,
        color: '#ea5455',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    successTextStyle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
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