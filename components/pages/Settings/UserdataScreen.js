import React from 'react'
import { globalStyles } from '../../ui/Theme'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UserdataScreen() {

    return (
        <KeyboardAwareScrollView contentContainerStyle={[globalStyles.container, { justifyContent: 'center', flex: 1 }]} >

            <View>
                <Text>Nombre</Text>
                <Text>Apellido</Text>
                <Text>Correo</Text>
                <Text>Usuario</Text>
            </View>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})