import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { globalStyles } from '../../ui/Theme';
import Collapsible from 'react-native-collapsible';
import { getCoins } from '../../../utils/QvaPayClient';
import QPButton from '../../ui/QPButton';

const OptionCard = ({ item, onPress, selected }) => (
    <Pressable onPress={onPress} style={[styles.card, styles.cardSquare, selected ? styles.cardSelected : styles.cardUnselected]}>
        <SvgUri width="24" height="24" uri={`https://qvapay.com/img/coins/${item.logo}.svg`} />
        <Text style={styles.cardText}>{item.name}</Text>
    </Pressable>
)

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

const screenWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardSize = (screenWidth - 22 * 2 - 5) / 3; // 10 es el padding horizontal del contenedor y 5 es el padding aplicado en las tarjetas del centro
const amountInputHeight = 50; // Ajusta este valor según el tamaño real del campo 'amount'
const depositButtonHeight = 60; // Ajusta este valor según el tamaño real del botón 'Depositar'
const titleHeight = 30; // Ajusta este valor según el tamaño real del título
const marginBottom = 20; // Ajusta este valor según los márgenes que deseas mantener
const maxHeight = windowHeight - amountInputHeight - depositButtonHeight - titleHeight * 3 - marginBottom;

export default function AddScreen({ navigation }) {

    const [amount, setAmount] = useState('');
    const [eWallets, setEWallets] = useState([]);
    const [bankOptions, setBankOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

    // State para controlar si cada categoría está abierta o cerrada
    const [eWalletsOpen, setEWalletsOpen] = useState(false);
    const [bankOptionsOpen, setBankOptionsOpen] = useState(false);
    const [cryptoCurrenciesOpen, setCryptoCurrenciesOpen] = useState(true);

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

            <QPButton onPress={onDepositPress} title="Depositar" />

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
        marginVertical: 10,
        fontFamily: 'Nunito-Regular'
    },
    input: {
        borderWidth: 1,
        marginBottom: 20,
        paddingVertical: 5,
        borderColor: 'gray',
        paddingHorizontal: 10,
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
    card: {
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#283046',
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
    cardCenter: {
        paddingHorizontal: 5,
    },
    cardContainer: {
        flex: 1 / 3,
        paddingVertical: 2.5,
    },
    cardSquare: {
        width: cardSize,
        height: cardSize,
    },
    scrollableFlatList: {
        maxHeight: maxHeight,
    },
})