import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Button } from 'react-native';
import QPButton from '../../ui/QPButton';
import QPCoinRow from '../../ui/QPCoinRow';
import QPSearchBar from '../../ui/QPSearchBar';
import { filterCoins } from '../../../utils/Helpers';
import { getCoins } from '../../../utils/QvaPayClient';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, textStyles, theme } from '../../ui/Theme';

export default function AddScreen() {

    const navigation = useNavigation();
    const [amount, setAmount] = useState(0.00);
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
    const [searchQuery, setSearchQuery] = useState('');
    const [stepTwoDisabled, setStepTwoDisabled] = useState(1);

    // Get the coins from the API and filter them
    useEffect(() => {
        const getPaymentMethods = async () => {
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins({ coins, in_out_p2p: "IN" });
            setBanks(filteredCoins.banks);
            setEWallets(filteredCoins.eWallets);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
        };
        getPaymentMethods();
    }, []);

    // Navigate to AddInstructionsScreen
    const onAddPress = () => {
        navigation.navigate('AddInstructionsScreen', { amount: amount, coin: selectedCoin });
    };

    // Handle the amount input
    const handleChangeAmount = (text) => {
        setAmount(text);
        if (text >= 1 && text <= 10000) {
            setStepTwoDisabled(false);
        } else {
            setStepTwoDisabled(true);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>
                {
                    step === 1 && (
                        <>
                            <Text style={textStyles.h1}>Depositar balance</Text>
                            <Text style={globalStyles.subtitle}>Determine la cantidad a depositar en su cuenta de QvaPay para comprar e intercambiar con otros.</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.dolarSign}>$</Text>
                                <TextInput
                                    value={amount}
                                    autoFocus={true}
                                    style={styles.amount}
                                    keyboardType="numeric"
                                    onChangeText={handleChangeAmount}
                                    cursorColor='white'
                                />
                            </View>
                            <QPButton onPress={() => setStep(2)} title="Siguiente" disabled={stepTwoDisabled} />
                        </>
                    )
                }
                {
                    step === 2 && (
                        <>
                            <ScrollView style={{ flex: 1 }}>

                                <Text style={textStyles.h1}>Tipo de moneda</Text>
                                <Text style={globalStyles.subtitle}>Actualmente soportamos una amplia variedad de métodos de pago, selecciones el de su preferencia.</Text>

                                <View style={{ marginVertical: 10 }}>
                                    <QPSearchBar style={{ paddingHorizontal: 0 }} setSearchQuery={setSearchQuery} />
                                </View>

                                {
                                    categories.map((category, index) => (
                                        <View key={index}>
                                            <Text style={textStyles.h3}>{category.title}</Text>
                                            <FlatList
                                                data={category.data.filter(item => searchQuery === '' || item.name.includes(searchQuery))}
                                                renderItem={({ item }) => <QPCoinRow item={item} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} in_out_p2p="IN" amount={amount} />}
                                                keyExtractor={item => item.id}
                                            />
                                        </View>
                                    ))
                                }

                            </ScrollView>

                            <QPButton onPress={onAddPress} title={`Depositar ${amount}`} disabled={!selectedCoin} />
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
    dolarSign: {
        fontSize: 30,
        marginRight: 5,
        fontFamily: "Rubik-ExtraBold",
        color: theme.darkColors.elevation_light,
    },
})