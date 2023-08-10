import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../../ui/Theme'

export default function KYCAsistantScreen() {

    // Verified Status
    const [verified, setVerified] = useState(false);

    return (
        <View style={[globalStyles.container, { alignItems: 'center' }]}>
            <Text style={globalStyles.title}>Coming Soon... ⚡️</Text>
        </View>
    )
}

const styles = StyleSheet.create({})