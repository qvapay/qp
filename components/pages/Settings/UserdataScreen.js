import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import { globalStyles, theme } from '../../ui/Theme'
import QPButton from '../../ui/QPButton'
import { AppContext } from '../../../AppContext';
import { updateUserData } from '../../../utils/QvaPayClient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePictureSection from '../../ui/ProfilePictureSection';
import AvatarPicture from '../../ui/AvatarPicture';

export default function UserdataScreen({ navigation }) {

    // Me object from AppContext
    const { me } = useContext(AppContext);

    const [name, setName] = useState(me.name)
    const [lastname, setLastname] = useState(me.lastname)
    const [username, setUsername] = useState(me.username)
    const [bio, setBio] = useState(me.bio)
    const [email, setEmail] = useState(me.email)
    const [sending, setSending] = useState(false);

    const updateData = async () => {
        setSending(true);
        try {
            const response = await updateUserData({ data: { name, lastname, username, bio }, navigation })
            console.log(response)
        } catch (error) {
            console.error(`Error in Update: ${error}`);
        } finally {
            setSending(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <ScrollView style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <AvatarPicture size={75} source_uri={me.profile_photo_url} showBadge={true} rating={me.average_rating} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={styles.fullNameView}>
                            <Text style={{ ...globalStyles.fullName }}>{name} {lastname}</Text>
                            {me.golden_check == 1 && (
                                <Image
                                    source={require('../../../assets/images/gold-badge.png')}
                                    style={{ marginLeft: 8, marginTop: 3 }}
                                />
                            )}
                        </View>
                        <Text style={{ fontFamily: 'Rubik-Regular', color: 'white', marginLeft: 10 }}>@{me.username}</Text>
                    </View>
                </View>

                <Text style={styles.inputLabelStyle}>Usuario:</Text>
                <View style={styles.sectionStyle}>
                    <FontAwesome5 name='lightbulb' size={20} style={{ color: 'white', marginRight: 10 }} />
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

                <Text style={styles.inputLabelStyle}>Bio:</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
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

            </ScrollView>

            <QPButton title="Actualizar" onPress={updateData} />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    sectionStyle: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: theme.darkColors.elevation,
        fontFamily: "Rubik-Regular",
    },
    inputLabelStyle: {
        fontSize: 14,
        marginTop: 16,
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
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    fullNameView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
})