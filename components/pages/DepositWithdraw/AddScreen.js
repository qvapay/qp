import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import QPButton from '../../ui/QPButton';
import OptionCard from '../../ui/OptionCard';
import { globalStyles } from '../../ui/Theme';
import Collapsible from 'react-native-collapsible';
import { filterCoins } from '../../../utils/Helpers';
import { getCoins } from '../../../utils/QvaPayClient';
import ScrollableFlatList from '../../ui/ScrollableFlatList';

export default function AddScreen({ navigation }) {

    const [amount, setAmount] = useState('$');
    const [eWallets, setEWallets] = useState([]);
    const [bankOptions, setBankOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

    const [eWalletsOpen, setEWalletsOpen] = useState(false);
    const [bankOptionsOpen, setBankOptionsOpen] = useState(false);
    const [cryptoCurrenciesOpen, setCryptoCurrenciesOpen] = useState(true);
    const [isDepositButtonDisabled, setIsDepositButtonDisabled] = useState(true);

    useEffect(() => {
        const getOptions = async () => {
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins({ coins, in_out_p2p: "IN" });
            setEWallets(filteredCoins.eWallets);
            setBankOptions(filteredCoins.bankOptions);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
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
            setIsDepositButtonDisabled(!(numericValue >= 5 && selectedOption !== null));
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
                    setIsDepositButtonDisabled(!(numericValue >= item.min_in && numericValue <= item.max_in));
                }}
                selected={selectedOption === item.id}
                in_out_p2p="IN"
            />
        </View>
    );

    // Navigate to AddInstructionsScreen
    const onAddPress = () => {
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

            <QPButton onPress={onAddPress} title="Depositar" disabled={isDepositButtonDisabled} />

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
        fontFamily: 'Rubik-Regular'
    },
    input: {
        fontSize: 30,
        color: 'white',
        marginVertical: 10,
        paddingVertical: 5,
        textAlign: 'center',
        paddingHorizontal: 20,
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
})