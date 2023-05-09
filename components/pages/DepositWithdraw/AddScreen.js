import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Add GlobalStyles from Theme
import { globalStyles } from '../../ui/Theme';

const bankOptions = [
    { id: 'bank1', name: 'Bank 1', icon: 'question' },
    { id: 'bank2', name: 'Bank 2', icon: 'question' },
    // Agrega más opciones de banco aquí
];

const cryptoCurrencies = [
    { id: 'btc-ln', name: 'Bitcoin Lightning', icon: 'question' },
    { id: 'btc', name: 'Bitcoin', icon: 'question' },
    { id: 'eth', name: 'Ethereum', icon: 'question' },
    // Agrega más criptomonedas aquí
];

const eWallets = [
    { id: 'wallet1', name: 'E-Wallet 1', icon: 'question' },
    { id: 'wallet2', name: 'E-Wallet 2', icon: 'question' },
    // Agrega más opciones de E-Wallet aquí
];

const OptionCard = ({ item, onPress, selected }) => (
    <Pressable
        onPress={onPress}
        style={[
            styles.card,
            selected ? styles.cardSelected : styles.cardUnselected,
        ]}
    >
        <FontAwesome5
            size={24}
            name={item.icon}
        />
        <Text style={styles.cardText}>{item.name}</Text>

    </Pressable>
)

export default function AddScreen() {

    const [amount, setAmount] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const RenderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <OptionCard
                item={item}
                onPress={() => setSelectedOption(item.id)}
                selected={selectedOption === item.id}
            />
        </View>
    );

    const onDepositPress = () => {
        // Aquí puedes generar una llamada API para procesar el depósito
        // Luego navegar al siguiente Screen con las instrucciones de depósito
        navigation.navigate('AddInstructionsScreen', {
            amount: amount,
            crypto: selectedOption,
        });
    };

    return (
        <View style={globalStyles.container}>

            <Text style={styles.title}>Cantidad a depositar:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setAmount}
                value={amount}
            />

            <Text style={styles.title}>Criptomonedas:</Text>
            <FlatList
                data={cryptoCurrencies}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />

            <Text style={styles.title}>Banco:</Text>
            <FlatList
                data={bankOptions}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />

            <Text style={styles.title}>E-Wallets:</Text>
            <FlatList
                data={eWallets}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />

            <Pressable
                style={styles.depositButton}
                onPress={onDepositPress}
            >
                <Text style={styles.buttonText}>Depositar</Text>
            </Pressable>
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
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'red',
    },
    cardSelected: {
        borderColor: '#7367f0',
    },
    cardUnselected: {
        borderColor: 'transparent',
    },
    cardText: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
    cardContainer: {
        flex: 1 / 3,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
})