import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Dimensions } from 'react-native';
import QPButton from '../../ui/QPButton';
import OptionCard from '../../ui/OptionCard';
import { globalStyles } from '../../ui/Theme';
import Collapsible from 'react-native-collapsible';
import { getCoins } from '../../../utils/QvaPayClient';
import ScrollableFlatList from '../../ui/ScrollableFlatList';

const windowHeight = Dimensions.get('window').height;
const amountInputHeight = 88; // Ajusta este valor según el tamaño real del campo 'amount'
const depositButtonHeight = 100; // Ajusta este valor según el tamaño real del botón 'Depositar'
const titleHeight = 30; // Ajusta este valor según el tamaño real del título
const marginBottom = 90; // Ajusta este valor según los márgenes que deseas mantener
const maxHeight = windowHeight - amountInputHeight - depositButtonHeight - titleHeight * 3 - marginBottom;

export default function WithdrawScreen({ navigation }) {

    const [amount, setAmount] = useState('$');
    const [receivedAmount, setReceivedAmount] = useState('$ 0.00');
    const [withdrawalDetails, setWithdrawalDetails] = useState([]);

    // Collapsible options
    const [eWallets, setEWallets] = useState([]);
    const [bankOptions, setBankOptions] = useState([]);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [eWalletsOpen, setEWalletsOpen] = useState(false);
    const [bankOptionsOpen, setBankOptionsOpen] = useState(false);
    const [cryptoCurrenciesOpen, setCryptoCurrenciesOpen] = useState(true);
    const [isWithdrawButtonDisabled, setIsWithdrawButtonDisabled] = useState(true);

    useEffect(() => {

        const getOptions = async () => {
            // Get Coins and filter them by three main categories: Bank, E-Wallet and Crypto with enabled_out = true
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins(coins);
            setEWallets(filteredCoins.eWallets);
            setBankOptions(filteredCoins.bankOptions);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
        };

        const filterCoins = (coins) => {
            const bankOptions = coins.find((category) => category.name === 'Bank').coins;
            const filteredBankOptions = bankOptions.filter((option) => option.enabled_out);

            const cryptoCurrencies = coins.find((category) => category.name === 'Criptomonedas').coins;
            const filteredCryptoCurrencies = cryptoCurrencies.filter((option) => option.enabled_out);

            const eWallets = coins.find((category) => category.name === 'E-Wallet').coins;
            const filteredEWallets = eWallets.filter((option) => option.enabled_out);

            return {
                bankOptions: filteredBankOptions,
                cryptoCurrencies: filteredCryptoCurrencies,
                eWallets: filteredEWallets,
            };
        };

        getOptions();
    }, []);

    // Navigate to AddInstructionsScreen
    const onWithdrawPress = () => {
        console.log("Withdraw Pressed");
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

    return (
        <View style={globalStyles.container}>

            <Text style={styles.label}>Cantidad a extraer:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />

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

            <QPButton onPress={onWithdrawPress} title="Extraer Balance" disabled={isWithdrawButtonDisabled} />

        </View>
    );
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
    label: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
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
    pickerText: {
        fontSize: 18,
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        fontFamily: 'Nunito-Regular',
    },
    currencyText: {
        fontSize: 16,
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 5,
        fontFamily: 'Nunito-Regular',
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
        fontFamily: 'Nunito-Regular',
    },
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