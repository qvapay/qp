import React, { useState, useContext } from 'react'
import { globalStyles } from '../../ui/Theme'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import QPButton from '../../ui/QPButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppContext } from '../../../AppContext';
import { updateUserData } from '../../../utils/QvaPayClient'

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
        <KeyboardAwareScrollView contentContainerStyle={[globalStyles.container, { justifyContent: 'center', flex: 1 }]} >

            <View style={{ flex: 1 }}>

                <Text style={styles.inputLabelStyle}>Nombre de usuario:</Text>
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

            </View>

            <QPButton title="Actualizar" onPress={updateData} />

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    sectionStyle: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderColor: '#283046',
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
})