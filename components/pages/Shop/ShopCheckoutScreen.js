import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import { getProductByUuid, buyProduct } from '../../../utils/QvaPayClient';
import { AppContext } from '../../../AppContext';
import FastImage from 'react-native-fast-image';
import QPButton from '../../ui/QPButton';

export default function ShopCheckoutScreen({ route }) {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const { uuid, amount, value } = route.params;
    const [total, setTotal] = useState(0);
    const [buying, setBuying] = useState(false);
    const [product, setProduct] = useState({});
    const { name, lead, color, price, tax, desc, meta, category, logo_url, cover_url } = product;
    const [balanceError, setBalanceError] = useState(false);

    // if me.balance is less than total then disable the button and show {value} in red color, so create a state for truye or false
    useEffect(() => {
        if (me.balance < total) {
            setBalanceError(true);
        } else {
            setBalanceError(false);
        }
    }, [total]);

    // useEffect to retrive product data from API and set it to product state
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductByUuid({ navigation, uuid });
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setTotal(fetchedProduct.price);
            }
        };
        fetchProduct();
    }, []);

    // set headerRight with the Current Balance
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.balance}>
                    <Text style={styles.balanceText}>
                        $ {me.balance}
                    </Text>
                </View>
            ),
        });
    }, []);

    // Set the notification bar color to color variable
    useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(theme.darkColors.background);
        }
    }, [color]);

    // Handle Checkout
    const handleCheckout = async () => {
        setBuying(true);
        const response = await buyProduct({ navigation, uuid, amount, value });
        console.log(response)
        if (response) {
            navigation.navigate('MainStack', { screen: 'HomeScreen' });
        }
        setBuying(false);
    }

    // Product item snippet
    const ProductItem = () => (
        <View style={styles.productItem}>
            <FastImage
                style={styles.productImage}
                source={{ uri: `${logo_url}` }}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.productData}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productPrice}>{`$${amount}`}</Text>
            </View>
        </View>
    )

    return (
        <View style={globalStyles.container}>

            {
                buying ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Rubik-Regular' }}>Comprando...</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.cartContainer}>
                            <ProductItem />
                        </View>

                        <View style={{ paddingTop: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 5, alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Rubik-Regular' }}>A pagar:</Text>
                                <Text style={{ color: balanceError ? theme.darkColors.danger : theme.darkColors.success, fontSize: 20, fontFamily: 'Rubik-Bold' }}>$ {value}</Text>
                            </View>

                            <QPButton title="Finalizar Compra" onPress={handleCheckout} disabled={balanceError} />
                        </View>
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
        flex: 1,
        marginVertical: 10,
    },
    productItem: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    productData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productName: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik-Regular',
    },
    productPrice: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik-Bold',
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
})