import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import QPButton from '../../ui/QPButton';
import { globalStyles, textStyles } from '../../ui/Theme';
import { filterCoins } from '../../../utils/Helpers';
import { getCoins } from '../../../utils/QvaPayClient';
import QPSearchBar from '../../ui/QPSearchBar';
import QPCoinRow from '../../ui/QPCoinRow';

export default function AddScreen({ navigation }) {

    const [amount, setAmount] = useState('$');
    const [eWallets, setEWallets] = useState([]);
    const [banks, setBanks] = useState([]);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(0);
    const categories = [
        { title: 'Cripto:', data: cryptoCurrencies },
        { title: 'Bancos:', data: banks },
        { title: 'Monederos:', data: eWallets },
    ];

    // Asistant steps
    const [step, setStep] = useState(1);
    const [stepTwoDisabled, setStepTwoDisabled] = useState(true);

    // setSearchQuery state
    const [searchQuery, setSearchQuery] = useState('');

    // Get the coins from the API and filter them
    useEffect(() => {
        const getOptions = async () => {
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins({ coins, in_out_p2p: "IN" });
            setBanks(filteredCoins.banks);
            setEWallets(filteredCoins.eWallets);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
        };
        getOptions();
    }, []);

    // Always keep the $ before the amount (step 1)
    const handleAmountChange = (text) => {
        const inputText = text.replace(/^\$/, '');
        if (inputText.length > 5) { return }
        if (/^\d*\.?\d*$/.test(inputText) || inputText === '') {
            setAmount('$' + inputText);
            const numericValue = parseFloat(inputText);
            setStepTwoDisabled(!(numericValue >= 5));
        }
    };

    // Navigate to AddInstructionsScreen
    const onAddPress = () => {
        navigation.navigate('AddInstructionsScreen', { amount: amount.substring(1), coin: selectedCoin });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[globalStyles.container, { justifyContent: 'flex-start' }]}
            >
                {
                    step === 1 && (
                        <>
                            <View style={{ flex: 1 }}>
                                <Text style={textStyles.h1}>Depositar balance:</Text>
                                <Text style={globalStyles.subtitle}>Determine la cantidad a depositar en su cuenta de QvaPay para comprar e intercambiar con otros.</Text>
                                <TextInput
                                    value={amount}
                                    autoFocus={true}
                                    style={styles.amount}
                                    keyboardType="numeric"
                                    onChangeText={handleAmountChange}
                                    cursorColor='white'
                                />
                                {/** A Tag Selector of $5, $10, $50, $100 etc */}
                            </View>

                            <QPButton onPress={() => setStep(2)} title="Siguiente" disabled={stepTwoDisabled} />
                        </>
                    )
                }
                {
                    step === 2 && (
                        <>
                            <ScrollView style={{ flex: 1 }}>
                                <Text style={textStyles.h1}>Tipo de moneda:</Text>
                                <Text style={globalStyles.subtitle}>Actualmente soportamos una amplia variedad de métodos de pago, seleccion el de su preferencia.</Text>

                                <QPSearchBar style={{ paddingHorizontal: 0 }} setSearchQuery={setSearchQuery} />

                                {categories.map((category, index) => (
                                    <View key={index}>
                                        <Text style={textStyles.h3}>{category.title}</Text>
                                        <FlatList
                                            data={category.data.filter(item => searchQuery === '' || item.name.includes(searchQuery))}
                                            renderItem={({ item }) => <QPCoinRow item={item} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} in_out_p2p="IN" amount={amount.substring(1)} />}
                                            keyExtractor={item => item.id}
                                        />
                                    </View>
                                ))}

                            </ScrollView>

                            <QPButton onPress={onAddPress} title="Depositar" disabled={!selectedCoin} />
                        </>
                    )
                }
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: 'white',
        marginVertical: 10,
        fontFamily: 'Rubik-Regular'
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Black',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardCenter: {
        paddingHorizontal: 3,
    },
    cardContainer: {
        flex: 1 / 3,
        paddingVertical: 2.5,
    },
})