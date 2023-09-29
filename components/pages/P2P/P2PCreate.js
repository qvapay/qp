import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles, textStyles } from '../../ui/Theme'

export default function P2PCreate() {

    // Steps of the P2PCreate
    // 1. Select the operation [buy, sell]
    // 2. Select the amount to [buy, sell]
    // 3. Select the payment method
    // 4. Select the desired [receive/send] amount
    // 5. Review the data and confirm the operation
    // States for steps:
    const [step, setStep] = useState(1)
    const [operation, setOperation] = useState(null)
    const [amount, setAmount] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [desiredAmount, setDesiredAmount] = useState(null)

    // useEffect for payment methods

    // TODO: Create the functions for each step

    // Send info via API
    const publishP2P = () => {
        console.log('Publishing P2P')
        console.log(operation, amount, paymentMethod, desiredAmount)
    }

    return (
        <View style={[globalStyles.container, { paddingTop: 10, paddingHorizontal: 20 }]}>

            <View style={globalStyles.modalTopBar}></View>

            <View style={{ flex: 1 }}>
                <Text style={textStyles.h1}>Crear oferta P2P:</Text>



            </View>

        </View>
    )
}

const styles = StyleSheet.create({

})