import React from 'react'
import { Button } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage';


export default function SettingsScreen({ navigation }) {

    // Logout function
    // Delete accessToken from EncryptedStorage
    // Navigate to AuthStack
    const logout = () => {
        EncryptedStorage.removeItem("accessToken");
        navigation.replace('AuthStack');
    }

    // Go Back button
    const dismiss = () => {
        navigation.goBack();
    }

    return (
        <View>
            <Text>Settings</Text>
            <Button
                onPress={dismiss}
            >
                <Text>X</Text>
            </Button>
            <Button
                onPress={logout}
            >
                <Text>Logout</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({})