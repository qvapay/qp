import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, Pressable } from 'react-native'
import { globalStyles, textStyles, theme } from '../../ui/Theme'
import QPButton from '../../ui/QPButton'
import { SvgUri } from 'react-native-svg';
import QPCoinRow from '../../ui/QPCoinRow';
// import QPSearchBar from '../../ui/QPSearchBar';
import { filterCoins } from '../../../utils/Helpers';
import { transformText } from '../../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';
import { qvaPayClient, getCoins } from '../../../utils/QvaPayClient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LottieView from "lottie-react-native";

export default function P2PCreate() {

    // Steps of the P2PCreate
    // 3. Select the amount to [buy, sell] & Select the desired [receive/send] amount
    // 4. Review the data and confirm the operation

    const navigation = useNavigation();
    const [step, setStep] = useState(5)
    const [operation, setOperation] = useState(null)
    const [amount, setAmount] = useState(null)
    const [desiredAmount, setDesiredAmount] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [sellOperations, setSellOperations] = useState(0)
    const [buyOperations, setBuyOperations] = useState(0)
    const [eWallets, setEWallets] = useState([]);
    const [banks, setBanks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(0);
    const categories = [
        { title: 'Cripto:', data: cryptoCurrencies },
        { title: 'Bancos:', data: banks },
        { title: 'Monederos:', data: eWallets },
    ];

    // P2P private offer
    // P2P only KYC offer
    // Promote P2P offer
    const [privateOffer, setPrivateOffer] = useState(false)
    const [onlyKYC, setOnlyKYC] = useState(false)
    const [promoteOffer, setPromoteOffer] = useState(false)

    // useEffect to get the total amount of buy and sell operations
    useEffect(() => {
        getOperations()
        getPaymentMethods()
    }, [])

    // Api Call to get the total amount of buy and sell operations
    const getOperations = async () => {
        const response = await qvaPayClient.get('p2p/get_total_operations')
        if (response.status == 200 && response.data && response.data.sell && response.data.buy) {
            setSellOperations(response.data.sell)
            setBuyOperations(response.data.buy)
        } else {
            setSellOperations(0)
            setBuyOperations(0)
        }
    }

    // Api Call to get the payment methods
    const getPaymentMethods = async () => {
        const coins = await getCoins(navigation)
        const filteredCoins = filterCoins({ coins, in_out_p2p: "P2P" })
        setBanks(filteredCoins.banks)
        setEWallets(filteredCoins.eWallets)
        setCryptoCurrencies(filteredCoins.cryptoCurrencies)
    };

    // Step 3 validator for the QPButton, must have a selectedCoin, amount and desiredAmount
    const stepThreeValidator = () => {
        if (selectedCoin && amount && desiredAmount && amount != "0.00" && desiredAmount != "0.00") {
            return false
        }
        return true
    }

    // get Coin data by ID
    const getCoinById = (id) => {
        const coin = banks.find(coin => coin.id == id)
        if (coin) {
            return coin
        }
        const coin2 = eWallets.find(coin => coin.id == id)
        if (coin2) {
            return coin2
        }
        const coin3 = cryptoCurrencies.find(coin => coin.id == id)
        if (coin3) {
            return coin3
        }
        return null
    }

    // Handle the Operation selection
    const handleOperation = (operation) => {
        setOperation(operation)
        setStep(2)
    }

    // Handle the selectedCoin
    const handleSelectedCoin = (id) => {
        setSelectedCoin(id)
        setPaymentMethod(id)
        setAmount("0.00")
        setDesiredAmount("0.00")
        setStep(3)
    }

    // Review the data and confirm the operation
    const reviewP2P = () => {
        // Require a selectedCoin, amount and desiredAmount
        if (stepThreeValidator()) {
            return
        }
        setStep(4)
    }

    // Send info via API
    const publishP2P = () => {
        setStep(5)
        // Send the data to the API
        // If success, go to the P2P show screen
        // If error, show the error

    }

    return (
        <View style={[globalStyles.container, { paddingTop: 10, paddingHorizontal: 10 }]}>

            {
                step < 5 && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Pressable onPress={() => setStep(1)} style={{ flex: 1, height: step >= 1 ? 7 : 5, backgroundColor: step >= 1 ? theme.darkColors.primary : "#6759EF60", marginRight: 4, borderRadius: 2 }} />
                        <Pressable onPress={() => setStep(2)} style={{ flex: 1, height: step >= 2 ? 7 : 5, backgroundColor: step >= 2 ? theme.darkColors.primary : "#6759EF60", marginRight: 4, borderRadius: 2 }} />
                        <Pressable onPress={() => setStep(3)} style={{ flex: 1, height: step >= 3 ? 7 : 5, backgroundColor: step >= 3 ? theme.darkColors.primary : "#6759EF60", marginRight: 4, borderRadius: 2 }} />
                        <Pressable onPress={() => setStep(4)} style={{ flex: 1, height: step >= 4 ? 7 : 5, backgroundColor: step >= 4 ? theme.darkColors.primary : "#6759EF60", borderRadius: 2 }} />
                    </View>
                )
            }

            <View style={{ flex: 1 }}>


                {
                    step == 1 && (
                        <>
                            <Text style={textStyles.h1}>Crear oferta P2P:</Text>
                            <Text style={[textStyles.h3, { textAlign: 'center' }]}>Selecciona si deseas comprar o vender tus dólares digitales de QvaPay:</Text>
                            <View style={{ flex: 1, paddingVertical: 10 }}>
                                <View style={[styles.optionCard, { backgroundColor: "#7BFFB160" }]}>
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <Text style={[textStyles.h4, { textAlign: 'center' }]}>Selecciona esta opción si deseas adquirir saldo en dólares digitales.</Text>
                                        <Text style={[textStyles.h2, { textAlign: 'center' }]}>{sellOperations} operaciones</Text>
                                    </View>
                                    <QPButton title='Comprar' onPress={() => handleOperation('buy')} success />
                                </View>

                                <View style={[styles.optionCard, { backgroundColor: "#DB253E60" }]}>
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <Text style={[textStyles.h4, { textAlign: 'center' }]}>Selecciona esta opción si deseas vender tu saldo en dólares digitales.</Text>
                                        <Text style={[textStyles.h2, { textAlign: 'center' }]}>{buyOperations} operaciones</Text>
                                    </View>
                                    <QPButton title='Vender' onPress={() => handleOperation('sell')} danger />
                                </View>
                            </View>
                        </>
                    )
                }

                {
                    step == 2 && (
                        <ScrollView style={{ marginTop: 10 }}>
                            <Text style={textStyles.h3}>Selecciona la moneda con la cual {operation == "buy" ? "comprar" : "vender"} dólares digitales de QvaPay</Text>
                            {
                                categories.map((category, index) => (
                                    <View key={index}>
                                        <Text style={textStyles.h3}>{category.title}</Text>
                                        <FlatList
                                            data={category.data.filter(item => searchQuery === '' || item.name.includes(searchQuery))}
                                            renderItem={({ item }) => <QPCoinRow item={item} selectedCoin={selectedCoin} setSelectedCoin={handleSelectedCoin} in_out_p2p="P2P" />}
                                            keyExtractor={item => item.id}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    )
                }

                {
                    step == 3 && (
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[textStyles.h3, { textAlign: 'center' }]}>¿Cuánto quieres {operation == "buy" ? "comprar" : "vender"} en balance de QvaPay?</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        value={amount}
                                        style={[styles.amount, { color: amount == "0.00" ? theme.darkColors.elevation_light : 'white' }]}
                                        keyboardType="numeric"
                                        onChangeText={setAmount}
                                        cursorColor='white'
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[textStyles.h3, { textAlign: 'center' }]}>¿Cuánto quieres {operation == "buy" ? "pagar" : "recibir"} en {getCoinById(paymentMethod)?.name}?</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        value={desiredAmount}
                                        style={[styles.amount, { color: desiredAmount == "0.00" ? theme.darkColors.elevation_light : 'white' }]}
                                        keyboardType="numeric"
                                        onChangeText={setDesiredAmount}
                                        cursorColor='white'
                                    />
                                </View>
                            </View>
                            <QPButton onPress={reviewP2P} title={`Agregar detalles`} disabled={!stepThreeValidator} />
                        </View>
                    )
                }

                {
                    step == 4 && (
                        <View style={{ flex: 1, marginTop: 20 }}>

                            <Text style={[textStyles.h2, { textAlign: 'center' }]}>Detalles de tu oferta P2P:</Text>

                            <View style={{ flex: 1, padding: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Tipo de oferta:</Text>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>{transformText(operation)}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Moneda:</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <SvgUri width="22" height="22" uri={`https://qvapay.com/img/coins/${getCoinById(selectedCoin)?.logo}.svg`} style={{ marginRight: 5 }} />
                                        <Text style={[textStyles.h3, { textAlign: 'center' }]}>{getCoinById(selectedCoin)?.name}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Cantidad a {operation == "buy" ? "comprar" : "vender"}:</Text>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>${amount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Cantidad a {operation == "buy" ? "pagar" : "recibir"}:</Text>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>{desiredAmount} {getCoinById(paymentMethod)?.tick}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Oferta Privada:</Text>

                                    <BouncyCheckbox
                                        size={20}
                                        fillColor={theme.darkColors.primary}
                                        unfillColor={theme.darkColors.background}
                                        iconStyle={{ borderColor: theme.darkColors.primary, marginRight: -15 }}
                                        innerIconStyle={{ borderWidth: 1 }}
                                        textStyle={{ fontFamily: "Rubik-Regular", textDecorationLine: 'none' }}
                                        onPress={(isChecked) => { setPrivateOffer(isChecked) }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Oferta solo para KYC:</Text>

                                    <BouncyCheckbox
                                        size={20}
                                        fillColor={theme.darkColors.primary}
                                        unfillColor={theme.darkColors.background}
                                        iconStyle={{ borderColor: theme.darkColors.primary, marginRight: -15 }}
                                        innerIconStyle={{ borderWidth: 1 }}
                                        textStyle={{ fontFamily: "Rubik-Regular", textDecorationLine: 'none' }}
                                        onPress={(isChecked) => { setOnlyKYC(isChecked) }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                    <Text style={[textStyles.h3, { textAlign: 'center' }]}>Oferta Promocionada:</Text>

                                    <BouncyCheckbox
                                        size={20}
                                        fillColor={theme.darkColors.primary}
                                        unfillColor={theme.darkColors.background}
                                        iconStyle={{ borderColor: theme.darkColors.primary, marginRight: -15 }}
                                        innerIconStyle={{ borderWidth: 1 }}
                                        textStyle={{ fontFamily: "Rubik-Regular", textDecorationLine: 'none' }}
                                        onPress={(isChecked) => { setPromoteOffer(isChecked) }}
                                    />
                                </View>

                            </View>

                            <QPButton onPress={publishP2P} title={`Publicar oferta`} />
                        </View>
                    )
                }

                {
                    step == 5 && (
                        <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
                            <View style={{ marginHorizontal: 40 }}>
                                <LottieView source={require('../../../assets/lotties/uploading.json')} autoPlay style={styles.lottie} />
                            </View>
                            <Text style={[textStyles.h3, { textAlign: 'center' }]}>Publicando oferta P2P</Text>
                        </View>
                    )
                }

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    optionCard: {
        flex: 1,
        borderRadius: 10,
        marginVertical: 5,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "#7BFFB160",
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Black',
    },
    lottie: {
        width: 180,
        height: 180,
        alignSelf: 'center',
    },
})