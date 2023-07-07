import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import QPButton from '../../ui/QPButton';
import OptionCard from '../../ui/OptionCard';
import { globalStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import Collapsible from 'react-native-collapsible';
import { getCoins } from '../../../utils/QvaPayClient';
import ScrollableFlatList from '../../ui/ScrollableFlatList';
import { filterCoins } from '../../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';

export default function WithdrawScreen() {

    const navigation = useNavigation();

    const { me } = useContext(AppContext);
    const [amount, setAmount] = useState('$');

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
            const coins = await getCoins(navigation);
            const filteredCoins = filterCoins({ coins, in_out_p2p: "OUT" });
            setEWallets(filteredCoins.eWallets);
            setBankOptions(filteredCoins.bankOptions);
            setCryptoCurrencies(filteredCoins.cryptoCurrencies);
        };
        getOptions();
    }, []);

    // set headerRight with the Current Balance
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.balance}>
                    <Pressable onPress={() => setAmount('$' + me.balance)}>
                        <Text style={styles.balanceText}>
                            $ {me.balance}
                        </Text>
                    </Pressable>
                </View>
            ),
        });
    }, []);

    // Navigate to WithdrawInstructionsScreen
    const onWithdrawPress = () => {
        navigation.navigate('WithdrawInstructionsScreen', {
            amount: amount.substring(1),
            coin: selectedOption,
        });
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
                    setIsWithdrawButtonDisabled(!(numericValue >= item.min_out));
                }}
                selected={selectedOption === item.id}
                in_out_p2p="OUT"
            />
        </View>
    );

    // Dont allow the user to type on ampunt input more than me.balance value
    const handleAmountChange = (text) => {
        const numericValue = parseFloat(text.substring(1));
        if (numericValue > me.balance) { return }
        if (numericValue > 10000) { return }
        setAmount(text);
    };

    return (
        <View style={globalStyles.container}>

            <Text style={styles.label}>Cantidad a extraer:</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={handleAmountChange} />

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
    balance: {
        borderRadius: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#283046',
    },
    balanceText: {
        color: '#fff',
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
        paddingHorizontal: 20,
        fontFamily: 'Rubik-Black',
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
        fontFamily: 'Rubik-Regular',
    },
    currencyText: {
        fontSize: 16,
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 20,
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