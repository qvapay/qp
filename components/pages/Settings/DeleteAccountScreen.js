import React, { useState, useContext } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { globalStyles } from '../../ui/Theme'
import Loader from '../../ui/Loader'
import QPInput from '../../ui/QPInput'
import QPButton from '../../ui/QPButton'
import { AppContext } from '../../../AppContext'

export default function DeleteAccountScreen() {

    const { me } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [errortext, setErrortext] = useState('')
    const [deletionText, setDeletionText] = useState('delete-' + me.username)
    const [confirmDeletionText, setConfirmDeletionText] = useState('')

    const deleteAccount = async () => {
        setLoading(true);
        try {
            // const response = await deleteAccountRequest()
            // console.log(response)
            // if (response.status === 201) {
            //     await logout()
            // } else {
            //     setErrortext('Error al eliminar la cuenta')
            // }
        } catch (error) {
            console.error(`Error in Delete Account: ${error}`)
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <Loader loading={loading} />

            <ScrollView>

                <Text style={styles.confirmationText}>Escriba el texto '{deletionText}' para confirmar la eliminación de su cuenta</Text>

                <QPInput
                    prefixIconName="trash"
                    placeholder={deletionText}
                    onChangeText={(delete_text) => setConfirmDeletionText(delete_text)}
                    returnKeyType="next"
                />

            </ScrollView>

            <QPButton title="Confirmar Eliminación" onPress={deleteAccount} danger={true} outline={true} />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    confirmationText: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'Rubik-Medium'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})