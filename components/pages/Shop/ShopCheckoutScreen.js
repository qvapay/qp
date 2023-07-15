import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import FastImage from 'react-native-fast-image';
import { getProductByUuid } from '../../../utils/QvaPayClient';
import QPButton from '../../ui/QPButton';

export default function ShopCheckoutScreen({ route }) {

    // navigation hook
    const navigation = useNavigation();

    // Get from params: uuid, amount to calculate total
    const { uuid, amount } = route.params;
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

    const handleCheckout = () => {
        console.log(uuid)
    }

    // Set the notification bar color to color variable
    useEffect(() => {
        StatusBar.setBackgroundColor(theme.darkColors.background);
    }, [color]); 

    return (
        <View style={globalStyles.container}>

            <View style={styles.cartContainer}>
                <Text>ShopCheckoutScreen</Text>
                <Text>{uuid}</Text>
                <Text>{amount}</Text>
            </View>

            <QPButton title="Finalizar Compra" onPress={handleCheckout} />

        </View>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
})