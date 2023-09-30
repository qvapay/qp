import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles, textStyles } from '../../ui/Theme'
import QPButton from '../../ui/QPButton'

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

    // Handle the Operation selection
    const handleOperation = (operation) => {
        setOperation(operation)
        setStep(2)
    }

    // Handle the Amount selection
    const handleAmount = (amount) => {
        setAmount(amount)
        setStep(3)
    }

    // Send info via API
    const publishP2P = () => {
        console.log('Publishing P2P')
        console.log(operation, amount, paymentMethod, desiredAmount)
    }

    return (
        <View style={[globalStyles.container, { paddingTop: 10, paddingHorizontal: 10 }]}>

            <View style={globalStyles.modalTopBar}></View>

            <View style={{ flex: 1 }}>

                {
                    step == 1 && (
                        <>
                            <Text style={textStyles.h1}>Crear oferta P2P:</Text>
                            <Text style={textStyles.h6}>Selecciona si deseas comprar o vender tus dólares digitales de QvaPay:</Text>

                            <View style={{ flex: 1, paddingVertical: 10 }}>
                                <View style={[styles.optionCard, { backgroundColor: "#7BFFB160" }]}>
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <Text style={[textStyles.h3, { textAlign: 'center' }]}>Selelciona esta opción si deseas adquirir saldo en dólares digitales.</Text>
                                    </View>
                                    <QPButton title='Comprar' onPress={() => handleOperation('buy')} success />
                                </View>

                                <View style={[styles.optionCard, { backgroundColor: "#DB253E60" }]}>
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <Text style={[textStyles.h3, { textAlign: 'center' }]}>Selelciona esta opción si deseas vender tu saldo en dólares digitales.</Text>
                                    </View>
                                    <QPButton title='Vender' onPress={() => handleOperation('sell')} danger />
                                </View>
                            </View>
                        </>
                    )
                }

                {
                    step == 2 && (
                        <>
                            <Text style={textStyles.h1}>Crear oferta P2P:</Text>
                            <Text style={textStyles.h6}>Selecciona si deseas comprar o vender tus dólares digitales de QvaPay:</Text>
                        </>
                    )
                }

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    optionCard: {
        flex: 1,
        borderRadius: 10,
        marginVertical: 5,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "#7BFFB160",
    },
})