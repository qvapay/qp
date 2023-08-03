import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { globalStyles, textStyles } from '../../ui/Theme'
import { useNavigation } from '@react-navigation/native';
import QPInput from '../../ui/QPInput';
import QPButton from '../../ui/QPButton';
import apiRequest from '../../../utils/QvaPayClient'
import Toast from 'react-native-toast-message';

export default function PasswordScreen() {

    const navigation = useNavigation();
    const [userPassword, setUserPassword] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserPassword2, setNewUserPassword2] = useState('');

    const updatePassword = async () => {

        // Check if newUserPassword and newUserPassword2 are equal
        if (newUserPassword !== newUserPassword2) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Check if newUserPassword is empty
        if (newUserPassword === '') {
            alert('La contraseña no puede estar vacía');
            return;
        }

        // Check if newUserPassword is less than 8 characters
        if (newUserPassword.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        // Check if newUserPassword is equal to userPassword
        if (newUserPassword === userPassword) {
            alert('La contraseña nueva no puede ser igual a la actual');
            return;
        }

        // Check if userPassword is empty
        if (userPassword === '') {
            alert('La contraseña actual no puede estar vacía');
            return;
        }

        // Send the request to the API
        try {
            const response = await updatePasswordRequest();
            if (response.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Contraseña actualizada correctamente',
                    position: 'bottom',
                    bottomOffset: 10,
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            // Clear the password fields
            setUserPassword('');
            setNewUserPassword('');
            setNewUserPassword2('');
        }
    }

    // Api call to update the password
    const updatePasswordRequest = async () => {
        // Send update Passorw request to apiRequest
        try {
            const url = `/user/password`
            const data = { password: userPassword, new_password: newUserPassword }
            const response = await apiRequest(url, { method: 'POST', data }, navigation);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <ScrollView>

                <View style={{ marginVertical: 20 }}>

                    <Text style={textStyles.h1}>Cambiar contraseña:</Text>

                    <QPInput
                        prefixIconName="lock"
                        placeholder="Contraseña actual"
                        onChangeText={(password) => setUserPassword(password)}
                        secureTextEntry={true}
                        returnKeyType="next"
                    />

                    <QPInput
                        prefixIconName="lock"
                        placeholder="Nueva contraseña"
                        onChangeText={(new_password) => setNewUserPassword(new_password)}
                        secureTextEntry={true}
                        returnKeyType="next"
                    />

                    <QPInput
                        prefixIconName="lock"
                        placeholder="Confirmar nueva contraseña"
                        onChangeText={(new_password2) => setNewUserPassword2(new_password2)}
                        secureTextEntry={true}
                    />

                </View>

            </ScrollView>

            <QPButton title="Actualizar Contraseña" onPress={updatePassword} />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

})