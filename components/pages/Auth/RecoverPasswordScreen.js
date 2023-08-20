import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme, textStyles } from '../../ui/Theme';
import Loader from '../../ui/Loader';
import { ScrollView } from 'react-native-gesture-handler';

export default function RecoverPasswordScreen() {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [errortext, setErrortext] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>
            <Loader loading={loading} />

            {
                success ? (
                    <>

                    </>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ marginHorizontal: 40 }}>
                            <Image source={require('../../../assets/images/auth/login.png')} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                            <Text style={textStyles.h1}>Recuperar contraseña:</Text>
                        </View>

                        <View style={{ flex: 1 }}>

                            <QPInput
                                prefixIconName="at"
                                placeholder="Correo, username o teléfono"
                                keyboardType="email-address"
                                returnKeyType="next"
                                autoCapitalize="none"
                                onChangeText={(email) => setEmail(email)}
                            />

                            {errortext != '' ? (
                                <Text style={styles.errorTextStyle}>
                                    {errortext}
                                </Text>
                            ) : null}

                            <QPButton title="Acceder" onPress={handleLoginSubmit} />

                        </View>

                    </ScrollView>
                )
            }


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})