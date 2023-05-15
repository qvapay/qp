import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';

const currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'BTC', value: 'BTC' },
    // Agrega más monedas aquí
];

export default function WithdrawScreen() {
    const [amount, setAmount] = useState('');
    const [destinationCurrency, setDestinationCurrency] = useState('');
    const [receivedAmount, setReceivedAmount] = useState('');
    const [withdrawalDetails, setWithdrawalDetails] = useState('');
    const [currencyListOpen, setCurrencyListOpen] = useState(false);

    const handleRequestWithdrawal = () => {
        // Lógica para solicitar la extracción
    };

    const toggleCurrencyList = () => {
        setCurrencyListOpen(!currencyListOpen);
    };

    const selectCurrency = (currency) => {
        setDestinationCurrency(currency.value);
        setCurrencyListOpen(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Withdraw Screen</Text>

            <Text style={styles.label}>Cantidad a extraer:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="Ingrese la cantidad a extraer"
            />

            <Text style={styles.label}>Moneda de destino:</Text>
            <Pressable onPress={toggleCurrencyList}>
                <Text style={styles.pickerText}>{destinationCurrency || 'Seleccione una moneda'}</Text>
            </Pressable>
            <Collapsible collapsed={!currencyListOpen}>
                {currencies.map((currency) => (
                    <Text key={currency.value} style={styles.currencyText} onPress={() => selectCurrency(currency)}>
                        {currency.label}
                    </Text>
                ))}
            </Collapsible>

            <Text style={styles.label}>Cantidad que recibe el usuario:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={receivedAmount}
                onChangeText={setReceivedAmount}
                placeholder="Ingrese la cantidad que recibe el usuario"
            />

            <Text style={styles.label}>Datos necesarios según el método de extracción seleccionado:</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                value={withdrawalDetails}
                onChangeText={setWithdrawalDetails}
                placeholder="Ingrese los detalles necesarios"
            />

            <TouchableOpacity style={styles.button} onPress={handleRequestWithdrawal}>
                <Text style={styles.buttonText}>Solicitar extracción</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({})