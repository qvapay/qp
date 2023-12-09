import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { globalStyles } from '../../ui/Theme'
import Loader from '../../ui/Loader'
import QPInput from '../../ui/QPInput'
import QPButton from '../../ui/QPButton'

const DeleteAccountScreen = () => {

    const [loading, setLoading] = useState(false)
    const [errortext, setErrortext] = useState('')

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

                

            </ScrollView>

            <QPButton title="Eliminar mi cuenta" onPress={deleteAccount} danger={true} outline={true} />

        </KeyboardAvoidingView>
    )
}

export default DeleteAccountScreen