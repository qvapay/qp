import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Pressable, Alert, ActivityIndicator, Animated, Easing, StatusBar } from 'react-native'
import QPButton from '../../ui/QPButton';
import { SvgUri } from 'react-native-svg';
import { globalStyles } from '../../ui/Theme';
import Clipboard from '@react-native-clipboard/clipboard';
import { truncateWalletAddress } from '../../../utils/Helpers';
import { getTopUpData, getCoinData, getTransaction } from '../../../utils/QvaPayClient';
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
    const [note, setNote] = useState('');
    const [memo, setMemo] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(1799);
    const paymentStatusIntervalRef = useRef();
    const [animation] = useState(new Animated.Value(0));

    // Get coin data using useEffect
    useEffect(() => {
        const fetchCoinData = async () => {

            try {
                const response = await getCoinData({ coin_id: coin, navigation });
                const { tick, logo, name, price } = response;
                const priceWithDecimals = parseFloat(price).toFixed(2);

                const walletResponse = await getTopUpData({ amount, coin: tick, navigation });
                const { transaction_id, value, wallet, note = "", memo = "" } = walletResponse;

                setLogo(logo)
                setName(name)
                setTick(tick)
                setNote(note)
                setMemo(memo)
                setValue(value)
                setWallet(wallet)
                setPrice(priceWithDecimals)
                setTransactionId(transaction_id)
                setLoading(false);

            } catch (error) {
                console.error(error);
            }
        };
        fetchCoinData();
    }, []);

    // Check payment status when loading becomes false
    useEffect(() => {
        if (!loading) {
            paymentStatusIntervalRef.current = setInterval(() => {
                checkPaymentStatus(transactionId);
            }, 15000);
            return () => clearInterval(paymentStatusIntervalRef.current);
        }
    }, [loading]);

    // Countdown timer
    useEffect(() => {
        let countdownInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);
        return () => clearInterval(countdownInterval);
    }, [timer]);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const opacity = animation.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [0, 0.8, 1],
    });

    const scale = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.2, 1],
    });

    const rotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '0deg'],
    });

    // Check the Payment Status from a transaction
    const checkPaymentStatus = async (transactionId) => {
        try {
            const transaction = await getTransaction({ uuid: transactionId, navigation });
            const { status } = transaction;
            if (status === "paid") {
                setIsPaid(true);
                clearInterval(paymentStatusIntervalRef.current);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Copy wallet address to clipboard
    const copyTextToClipboard = (text) => {
        Clipboard.setString(text);
        Toast.show({
            type: 'success',
            text1: 'Elemento copiado al portapapeles',
            position: 'bottom',
            bottomOffset: 10,
        });
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

    return (
        <View style={globalStyles.container}>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : isPaid ? (
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <Animated.View style={[styles.checkmarkContainer, { opacity, transform: [{ scale }, { rotate }] }]}>
                        <FontAwesome5 name="check" size={60} color="#fff" />
                    </Animated.View>
                    <Text style={styles.text}>Pago completado</Text>
                </View>
            ) : (
                <>
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
                                <Pressable onPress={() => copyTextToClipboard(value.toString())}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 16, fontFamily: 'Nunito-Bold' }]}>{value}</Text>
                                        <FontAwesome5 name="copy" solid size={14} color="#28c76f" style={{ marginLeft: 8, marginTop: 2 }} />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.itemColumn}>
                            <Text style={styles.text}>Wallet:</Text>
                            <Pressable onPress={() => copyTextToClipboard(wallet)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.text, { fontSize: 16, fontFamily: 'Nunito-Light', color: '#28c76f' }]}>{truncateWalletAddress(wallet)}</Text>
                                    <FontAwesome5 name="copy" solid size={14} color="#28c76f" style={{ marginLeft: 8, marginTop: 2 }} />
                                </View>
                            </Pressable>
                        </View>

                        {/** If memo isnt "" show indications */}
                        {memo != "" && (
                            <View style={styles.itemColumn}>
                                <Text style={styles.text}>Memo:</Text>
                                <Pressable onPress={() => copyTextToClipboard(memo)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.text, { fontSize: 16, fontFamily: 'Nunito-Light', color: '#28c76f' }]}>{memo}</Text>
                                        <FontAwesome5 name="copy" solid size={14} color="#28c76f" style={{ marginLeft: 8, marginTop: 2 }} />
                                    </View>
                                </Pressable>
                            </View>
                        )}

                        <View style={styles.itemColumn}>
                            <Text style={styles.text}>ID de transacción:</Text>
                            <Pressable onPress={() => copyTextToClipboard(transactionId)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.text, { fontSize: 14, textAlign: 'center', }]}>{transactionId}</Text>
                                    <FontAwesome5 name="copy" solid size={14} color="#28c76f" style={{ marginLeft: 8, marginTop: 2 }} />
                                </View>
                            </Pressable>
                        </View>

                        {note != "" ? (
                            <Text style={styles.invoiceFooter}>{note}</Text>
                        ) : (
                            <Text style={styles.invoiceFooter}>Realice el pago de esta factura en el tiempo indicado para evitar demoras en acreditarle.</Text>
                        )}

                        <Text style={[styles.text, { textAlign: 'center' }]}>
                            {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                        </Text>

                    </View>

                    <View>
                        <QPButton onPress={openWalletApp} title="Abrir wallet externa" />
                    </View>
                </>
            )}

            <Toast />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    },
    checkmarkContainer: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#4cd964',
        justifyContent: 'center',
    },
})