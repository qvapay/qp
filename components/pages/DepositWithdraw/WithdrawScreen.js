import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, FlatList, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import QPButton from '../../ui/QPButton';
import { globalStyles, textStyles, theme } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import { getCoins } from '../../../utils/QvaPayClient';
import { filterCoins } from '../../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';
import QPSearchBar from '../../ui/QPSearchBar';
import QPCoinRow from '../../ui/QPCoinRow';

export default function WithdrawScreen() {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [amount, setAmount] = useState('$');

    // Collapsible options
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

    useEffect(() => {
        const getOptions = async () => {
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins({ coins, in_out_p2p: "OUT" });
            setBanks(filteredCoins.banks);
            setEWallets(filteredCoins.eWallets);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
        };
        getOptions();
    }, []);

    // set headerRight with the Current Balance
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => setAmount('$' + me.balance)} style={styles.balance}>
                    <Text style={styles.balanceText}>
                        $ {me.balance}
                    </Text>
                </Pressable>
            ),
        });
    }, []);

    // Always keep the $ before the amount (step 1)
    const handleAmountChange = (text) => {
        const inputText = text.replace(/^\$/, '');
        if (parseFloat(inputText) > parseFloat(me.balance)) { return }
        if (inputText.length > 5) { return }
        if (/^\d*\.?\d*$/.test(inputText) || inputText === '') {
            setAmount('$' + inputText);
            const numericValue = parseFloat(inputText);
            setStepTwoDisabled(!(numericValue >= 5));
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>
                {
                    step === 1 && (
                        <>
                            <View style={{ flex: 1 }}>
                                <Text style={textStyles.h1}>Extraer balance:</Text>
                                <Text style={globalStyles.subtitle}>Seleccione la cantidad de balance que desea extraer desde su cuenta de QvaPay.</Text>
                                <TextInput
                                    value={amount}
                                    autoFocus={true}
                                    style={styles.amount}
                                    keyboardType="numeric"
                                    onChangeText={handleAmountChange}
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
                                <Text style={textStyles.h1}>Tipo de moneda:</Text>
                                <Text style={globalStyles.subtitle}>Seleccione la moneda con la cual desea extraer su balance de QvaPay.</Text>

                                <QPSearchBar style={{ paddingHorizontal: 0 }} setSearchQuery={setSearchQuery} />

                                {categories.map((category, index) => (
                                    <View key={index}>
                                        <Text style={textStyles.h3}>{category.title}</Text>
                                        <FlatList
                                            data={category.data.filter(item => searchQuery === '' || item.name.includes(searchQuery))}
                                            renderItem={({ item }) => <QPCoinRow item={item} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} in_out_p2p="OUT" amount={amount.substring(1)} />}
                                            keyExtractor={item => item.id}
                                        />
                                    </View>
                                ))}

                            </ScrollView>

                            <QPButton onPress={() => setStep(2)} title={`Extraer ${amount}`} disabled={!selectedCoin} />
                        </>
                    )
                }
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    balance: {
        borderRadius: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: theme.darkColors.elevation,
    },
    balanceText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: "Rubik-Bold",
    },
    title: {
        fontSize: 18,
        color: 'white',
        marginVertical: 10,
        fontFamily: 'Rubik-Regular'
    },
    label: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        fontFamily: 'Rubik-Regular'
    },
    input: {
        fontSize: 30,
        color: 'white',
        paddingVertical: 5,
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Black',
    },
    pickerText: {
        fontSize: 18,
        color: 'white',
        paddingVertical: 5,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        fontFamily: 'Rubik-Regular',
    },
    currencyText: {
        fontSize: 16,
        color: 'white',
        paddingVertical: 5,
        marginVertical: 5,
        fontFamily: 'Rubik-Regular',
    },
    button: {
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        color: 'white',
        marginVertical: 10,
        fontFamily: 'Rubik-Regular'
    },
    input: {
        fontSize: 30,
        color: 'white',
        paddingVertical: 5,
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Black',
    },
    depositButton: {
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardCenter: {
        paddingHorizontal: 5,
    },
    cardContainer: {
        flex: 1 / 3,
        paddingVertical: 2.5,
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Black',
    },
})