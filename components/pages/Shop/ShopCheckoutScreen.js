import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import { getProductByUuid } from '../../../utils/QvaPayClient';
import { AppContext } from '../../../AppContext';
import FastImage from 'react-native-fast-image';
import QPButton from '../../ui/QPButton';

export default function ShopCheckoutScreen({ route }) {

    // navigation hook
    const navigation = useNavigation();

    // Me Context
    const { me } = useContext(AppContext);

    // Get from params: uuid, amount to calculate total
    const { uuid, amount, value } = route.params;
    const [total, setTotal] = useState(0);
    const [product, setProduct] = useState({});
    const { name, lead, color, price, tax, desc, meta, category, logo_url, cover_url } = product;

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

    const handleCheckout = () => {
        console.log(uuid)
        console.log(amount)
        console.log(value)
    }

    // Set the notification bar color to color variable
    useEffect(() => {
        StatusBar.setBackgroundColor(theme.darkColors.background);
    }, [color]);

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
                <Text style={styles.productPrice}>{`$${price}`}</Text>
            </View>
        </View>
    )

    return (
        <View style={globalStyles.container}>

            <View style={styles.cartContainer}>
                <ProductItem />
            </View>

            <View style={{ paddingTop: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 5, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: 'Rubik-Regular' }}>A pagar:</Text>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Rubik-Bold' }}>$ {amount}</Text>
                </View>

                <QPButton title="Finalizar Compra" onPress={handleCheckout} />
            </View>

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
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: "Rubik-Bold",
    },
})