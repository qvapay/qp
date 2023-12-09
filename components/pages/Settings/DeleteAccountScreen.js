import React from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'

const DeleteAccountScreen = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>

            <Loader loading={loading} />

            <ScrollView>

                <View style={{ marginVertical: 20 }}>

                    {/** TODO Lottie Here */}

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

                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}

                </View>

            </ScrollView>

            <QPButton title="Actualizar Contraseña" onPress={updatePassword} />

        </KeyboardAvoidingView>
    )
}

export default DeleteAccountScreen