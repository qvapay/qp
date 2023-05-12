import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import Collapsible from 'react-native-collapsible';
import { getCoins } from '../../../utils/QvaPayClient';
import OptionCard from '../../ui/OptionCard';

// TODO: Add a search bar to filter the coins

// Scrollable FlatList for the Collapsible component
const ScrollableFlatList = ({ data, renderItem, keyExtractor, numColumns }) => (
    <ScrollView style={styles.scrollableFlatList}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
        />
    </ScrollView>
)

const windowHeight = Dimensions.get('window').height;
const amountInputHeight = 88; // Ajusta este valor según el tamaño real del campo 'amount'
const depositButtonHeight = 100; // Ajusta este valor según el tamaño real del botón 'Depositar'
const titleHeight = 30; // Ajusta este valor según el tamaño real del título
const marginBottom = 90; // Ajusta este valor según los márgenes que deseas mantener
const maxHeight = windowHeight - amountInputHeight - depositButtonHeight - titleHeight * 3 - marginBottom;

export default function AddScreen({ navigation }) {

    const [amount, setAmount] = useState('$');
    const [eWallets, setEWallets] = useState([]);
    const [bankOptions, setBankOptions] = useState([]);
    const [eWalletsOpen, setEWalletsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
    const [bankOptionsOpen, setBankOptionsOpen] = useState(false);
    const [cryptoCurrenciesOpen, setCryptoCurrenciesOpen] = useState(true);
    const [isDepositButtonDisabled, setIsDepositButtonDisabled] = useState(true);

    useEffect(() => {

        const getOptions = async () => {
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins(coins);

            setEWallets(filteredCoins.eWallets);
            setBankOptions(filteredCoins.bankOptions);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
        };

        const filterCoins = (coins) => {
            const bankOptions = coins.find((category) => category.name === 'Bank').coins;
            const filteredBankOptions = bankOptions.filter((option) => option.enabled_in);

            const cryptoCurrencies = coins.find((category) => category.name === 'Criptomonedas').coins;
            const filteredCryptoCurrencies = cryptoCurrencies.filter((option) => option.enabled_in);

            const eWallets = coins.find((category) => category.name === 'E-Wallet').coins;
            const filteredEWallets = eWallets.filter((option) => option.enabled_in);

            return {
                bankOptions: filteredBankOptions,
                cryptoCurrencies: filteredCryptoCurrencies,
                eWallets: filteredEWallets,
            };
        };

        getOptions();
    }, []);

    // Always keep the $ before the amount
    const handleAmountChange = (text) => {
        // Remove the $ before validating and processing the text
        const inputText = text.replace(/^\$/, '');

        if (/^\d*\.?\d*$/.test(inputText) || inputText === '') {
            setAmount('$' + inputText);
            const numericValue = parseFloat(inputText);
            setIsDepositButtonDisabled(!(numericValue >= 10 && selectedOption !== null));
        }
    };


    // Funciones para controlar la apertura y cierre de cada categoría
    const toggleCryptoCurrencies = () => {
        setCryptoCurrenciesOpen(!cryptoCurrenciesOpen);
        setBankOptionsOpen(false);
        setEWalletsOpen(false);
    };
    const toggleBankOptions = () => {
        setBankOptionsOpen(!bankOptionsOpen);
        setCryptoCurrenciesOpen(false);
        setEWalletsOpen(false);
    };
    const toggleEWallets = () => {
        setEWalletsOpen(!eWalletsOpen);
        setCryptoCurrenciesOpen(false);
        setBankOptionsOpen(false);
    };

    // Renderizado de cada acordeón
    const renderCryptoCurrencies = () => (
        <Collapsible collapsed={!cryptoCurrenciesOpen} >
            <ScrollableFlatList
                data={cryptoCurrencies}
                renderItem={({ item, index }) => RenderItem({ item, index })}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />
        </Collapsible>
    );

    const renderBankOptions = () => (
        <Collapsible collapsed={!bankOptionsOpen}>
            <ScrollableFlatList
                data={bankOptions}
                renderItem={({ item, index }) => RenderItem({ item, index })}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />
        </Collapsible>
    );

    const renderEWallets = () => (
        <Collapsible collapsed={!eWalletsOpen}>
            <ScrollableFlatList
                data={eWallets}
                renderItem={({ item, index }) => RenderItem({ item, index })}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />
        </Collapsible>
    );

    const RenderItem = ({ item, index }) => (
        <View style={[styles.cardContainer, index % 3 === 1 ? styles.cardCenter : null]}>
            <OptionCard
                item={item}
                onPress={() => {
                    setSelectedOption(item.id);
                    const numericValue = parseFloat(amount.substring(1));
                    setIsDepositButtonDisabled(!(numericValue >= 10));
                }}
                selected={selectedOption === item.id}
            />
        </View>
    );

    // Navigate to AddInstructionsScreen
    const onDepositPress = () => {
        navigation.navigate('AddInstructionsScreen', {
            amount: amount.substring(1),
            coin: selectedOption,
        });
    };

    return (
        <View style={globalStyles.container}>

            <Text style={styles.title}>Cantidad a depositar:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleAmountChange}
                value={amount}
            />

            <View style={{ flex: 1 }}>
                <Pressable onPress={toggleCryptoCurrencies}>
                    <Text style={styles.title}>Criptomonedas:</Text>
                </Pressable>
                {renderCryptoCurrencies()}

                <Pressable onPress={toggleBankOptions}>
                    <Text style={styles.title}>Banco:</Text>
                </Pressable>
                {renderBankOptions()}

                <Pressable onPress={toggleEWallets}>
                    <Text style={styles.title}>E-Wallets:</Text>
                </Pressable>
                {renderEWallets()}
            </View>

            <QPButton onPress={onDepositPress} title="Depositar" disabled={isDepositButtonDisabled} />

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
        color: 'white',
        marginVertical: 10,
        fontFamily: 'Nunito-Regular'
    },
    input: {
        fontSize: 30,
        color: 'white',
        paddingVertical: 5,
        marginVertical: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: 'Nunito-Black',
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
    scrollableFlatList: {
        maxHeight: maxHeight,
    },
})