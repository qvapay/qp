import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native'

const cryptoCurrencies = [
    { id: 'btc-ln', name: 'Bitcoin Lightning' },
    { id: 'btc', name: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum' },
    // Agrega más criptomonedas aquí
];

const CryptoCard = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
)

export default function AddScreen() {

    const [amount, setAmount] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    const onDepositPress = () => {
        // Aquí puedes generar una llamada API para procesar el depósito
        // Luego navegar al siguiente Screen con las instrucciones de depósito
        navigation.navigate('DepositInstructions', {
            amount: amount,
            crypto: selectedCrypto,
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cantidad a depositar:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setAmount}
                value={amount}
            />
            <Text style={styles.title}>Selecciona la criptomoneda:</Text>
            <FlatList
                data={cryptoCurrencies}
                renderItem={({ item }) => (
                    <CryptoCard
                        item={item}
                        onPress={() => setSelectedCrypto(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />
            <TouchableOpacity
                style={styles.depositButton}
                onPress={onDepositPress}
                disabled={!amount || !selectedCrypto}
            >
                <Text style={styles.buttonText}>Depositar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20,
    },
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    depositButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})