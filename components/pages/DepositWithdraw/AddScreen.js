import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { globalStyles } from '../../ui/Theme';
import { getCoins } from '../../../utils/QvaPayClient';

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

export default function AddScreen({ navigation }) {

    const [amount, setAmount] = useState('');
    const [eWallets, setEWallets] = useState([]);
    const [bankOptions, setBankOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

    useEffect(() => {
        const getOptions = async () => {
            const coins = await getCoins(navigation);

            // Extract bank options from coins API
            const bankOptions = coins.find((category) => category.name === 'Bank').coins;
            setBankOptions(bankOptions);

            // Extract crypto options from coins API
            const cryptoCurrencies = coins.find((category) => category.name === 'Criptomonedas').coins;
            setCryptoCurrencies(cryptoCurrencies);

            // Extract e-wallet options from coins API
            const eWallets = coins.find((category) => category.name === 'E-Wallet').coins;
            setEWallets(eWallets);
        };

        getOptions();
    }, []);

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