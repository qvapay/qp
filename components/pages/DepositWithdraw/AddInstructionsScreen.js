import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import QPButton from '../../ui/QPButton';
import { SvgUri } from 'react-native-svg';
import { globalStyles } from '../../ui/Theme';
import Clipboard from '@react-native-clipboard/clipboard';
import { getTopUpData, getCoinData } from '../../../utils/QvaPayClient';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AppLink from 'react-native-app-link';

const supportedWallets = [
    {
        name: 'Coinbase',
        packageName: 'com.coinbase.android',
        urlScheme: 'coinbase://',
    },
    {
        name: 'Trust Wallet',
        packageName: 'com.wallet.crypto.trustapp',
        urlScheme: 'trust://',
    },
    {
        name: 'MetaMask',
        packageName: 'io.metamask',
        urlScheme: 'metamask://',
    },
    {
        name: 'Coinomi',
        packageName: 'com.coinomi.wallet',
        urlScheme: 'coinomi://',
    },
    {
        name: 'Exodus',
        packageName: 'exodusmovement.exodus',
        urlScheme: 'exodus://',
    },
    {
        name: 'Atomic Wallet',
        packageName: 'io.atomicwallet',
        urlScheme: 'atomicwallet://',
    },
    {
        name: 'MyEtherWallet',
        packageName: 'com.myetherwallet.mewwallet',
        urlScheme: 'mewconnect://',
    },
    {
        name: 'Enjin Wallet',
        packageName: 'com.enjin.mobile.wallet',
        urlScheme: 'enjinwallet://',
    },
    {
        name: 'Bread Wallet',
        packageName: 'com.breadwallet',
        urlScheme: 'breadwallet://',
    },
    {
        name: 'Edge Wallet',
        packageName: 'co.edgesecure.app',
        urlScheme: 'edge://',
    },
    // Añade más billeteras y sus identificadores de paquete aquí
];


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
            position: 'bottom',
            bottomOffset: 10,
        });
    };

    // Show only initial and latest letters from a wallet
    const truncateWalletAddress = (address) => {
        if (address.length > 28) {
            return address.substring(0, 10) + '...' + address.substring(address.length - 10);
        }
        return address;
    };

    const openWalletApp = async () => {
        try {
            // Filtra las billeteras compatibles instaladas en el dispositivo
            const installedWallets = (
                await Promise.all(
                    supportedWallets.map(async (wallet) => {
                        try {
                            await AppLink.maybeOpenURL(wallet.urlScheme, {
                                appName: wallet.name,
                                appStoreId: '', // Coloca el ID de la tienda de aplicaciones para iOS aquí
                                playStoreId: wallet.packageName,
                            });
                            return true;
                        } catch (error) {
                            return false;
                        }
                    })
                )
            ).filter((installed, index) => installed && supportedWallets[index]);

            if (installedWallets.length === 0) {
                Toast.show({
                    type: 'error',
                    text1: 'No se encontraron billeteras compatibles',
                    position: 'bottom',
                    bottomOffset: 10,
                });
                return;
            }

            // Muestra la lista de billeteras instaladas y permite seleccionar una para abrir
            Alert.alert(
                'Seleccione una billetera',
                'Elija una billetera para completar el pago:',
                installedWallets.map((wallet) => ({
                    text: wallet.name,
                    onPress: () =>
                        AppLink.openInStore({
                            appName: wallet.name,
                            appStoreId: '', // Coloca el ID de la tienda de aplicaciones para iOS aquí
                            playStoreId: wallet.packageName,
                        }),
                })),
                { cancelable: true }
            );
        } catch (error) {
            console.error(error);
        }
    };

    // Comprobar si el pago se ha completado y mostrar un mensaje de éxito
    const checkPaymentStatus = () => {
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
                <QPButton onPress={openWalletApp} title="Abrir wallet externa" />
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