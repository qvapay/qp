import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QPButton from '../../ui/QPButton';
import { SvgUri } from 'react-native-svg';
import { globalStyles } from '../../ui/Theme';
import Clipboard from '@react-native-clipboard/clipboard';
import { getTopUpData, getCoinData } from '../../../utils/QvaPayClient';

import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function AddInstructionsScreen({ route, navigation }) {

    const { amount, coin } = route.params;
    const [value, setValue] = useState('');
    const [price, setPrice] = useState('');
    const [wallet, setWallet] = useState('');
    const [logo, setLogo] = useState('');
    const [tick, setTick] = useState('');
    const [name, setName] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(true);

    // Get coin data using useEffect
    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await getCoinData({ coin_id: coin, navigation });
                const { tick, logo, name, price } = response;
                const priceWithDecimals = parseFloat(price).toFixed(2);

                const walletResponse = await getTopUpData({ amount, coin: tick, navigation });
                const { transaction_id, value, wallet } = walletResponse;

                setWallet(wallet)
                setPrice(priceWithDecimals)
                setLogo(logo)
                setName(name)
                setTick(tick)
                setTransactionId(transaction_id)
                setValue(value)

                // now we can set the loading to false
                setLoading(false);

            } catch (error) {
                console.error(error);
            }
        };
        fetchCoinData();
    }, []);

    // Check payment Status
    useEffect(() => {
        checkPaymentStatus();
    }, []);

    // Copy wallet address to clipboard
    const copyWalletAddressToClipboard = () => {
        Clipboard.setString(wallet);
        console.log(wallet)
        Toast.show({
            type: 'success',
            text1: 'Dirección de billetera copiada al portapapeles',
            // text2: 'Dirección de billetera copiada al portapapeles',
            position: 'bottom',
            bottomOffset: 10,
        });
    };

    const truncateWalletAddress = (address) => {
        if (address.length > 28) {
            return address.substring(0, 10) + '...' + address.substring(address.length - 10);
        }
        return address;
    };

    const openWalletApp = () => {
        // Implementar la funcionalidad para abrir la aplicación de la billetera
        console.log('Abrir la aplicación de la billetera');
    };

    // Comprobar si el pago se ha completado y mostrar un mensaje de éxito
    const checkPaymentStatus = () => {
        // Implementar la lógica de comprobación de pago y mostrar un mensaje de éxito si se ha completado
        console.log('Comprobar el estado del pago');
    };

    return (
        <View style={[globalStyles.container]}>

            <View style={styles.cardContainer}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.title}>Recarga de SQP</Text>
                        <Text style={styles.subTitle}>Depósito con {name}</Text>
                    </View>
                    <View>
                        <SvgUri width="50" height="50" uri={`https://qvapay.com/img/coins/${logo}.svg`} />
                    </View>
                </View>

                <View style={styles.itemRow}>
                    <Text style={styles.text}>Moneda:</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={styles.text}>{tick}</Text>
                        <Text style={[styles.text, { fontSize: 14, fontFamily: 'Nunito-Light' }]}>$ {price}</Text>
                    </View>
                </View>
                <View style={styles.itemRow}>
                    <Text style={styles.text}>Valor:</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={[styles.text, { fontFamily: 'Nunito-Black', color: "#28c76f" }]}>+ ${amount}</Text>
                        <Text style={[styles.text, { fontSize: 16, fontFamily: 'Nunito-Bold' }]}>{value}</Text>
                    </View>
                </View>
                <View style={styles.itemColumn}>
                    <Text style={styles.text}>Wallet:</Text>

                    <Pressable onPress={copyWalletAddressToClipboard}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, { fontSize: 16, fontFamily: 'Nunito-Light', color: '#28c76f' }]}>{truncateWalletAddress(wallet)}</Text>
                            <FontAwesome5 name="copy" solid size={14} color="#28c76f" style={{ marginLeft: 8, marginTop: 2 }} />
                        </View>
                    </Pressable>

                </View>
                <View style={styles.itemColumn}>
                    <Text style={styles.text}>ID de transacción:</Text>
                    <Text style={[styles.text, { fontSize: 14, textAlign: 'center', }]}>{transactionId}</Text>
                </View>

                <Text style={styles.invoiceFooter}>Realice el pago de esta factura en el tiempo indicado para evitar demoras en acreditarle.</Text>

            </View>

            <View>
                <QPButton onPress={() => console.log("asd")} title="Abrir wallet externa" />
            </View>

            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'column',
        backgroundColor: '#283046',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito-Bold'
    },
    subTitle: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Nunito-Light'
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito-Regular'
    },
    itemRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    itemColumn: {
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    invoiceFooter: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'Nunito-Light',
    }
})