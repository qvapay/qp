import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles, textStyles } from '../../../ui/Theme'
import { AppContext } from '../../../../AppContext'
import LottieView from "lottie-react-native"
import { useNavigation } from '@react-navigation/native'
import QPTabButton from '../../../ui/QPTabButton'

export default function OwnerSubmit() {

    return (
        <View style={globalStyles.container}>
            <Text style={[textStyles.h1, { textAlign: 'center' }]}>Confirm</Text>

            <View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({})