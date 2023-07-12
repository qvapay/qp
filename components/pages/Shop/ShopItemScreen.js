import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { getProductByUuid } from '../../../utils/QvaPayClient';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';

export default function ShopItemScreen({ route }) {

    // navigation hook
    const navigation = useNavigation();

    const { uuid } = route.params;
    const [product, setProduct] = useState({});
    const { name, lead, color, price, tax, desc, meta, category, logo_url, cover_url } = product;

    // useEffect to retrive product data from API and set it to product state
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductByUuid({ navigation, uuid });
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, []);

    return (
        <View style={globalStyles.container}>

            <View style={[styles.featuredCard, { backgroundColor: color }]}>
                <FastImage
                    style={styles.logo}
                    source={{ uri: `${logo_url}` }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>

            <View style={styles.productData}>

                <View style={styles.leadContainer}>
                    <Text style={styles.leadText}>{lead}</Text>
                </View>

                <Text style={globalStyles.title}>{name}</Text>
                
                <Text style={globalStyles.subtitle}>{price}</Text>
                <Text style={globalStyles.subtitle}>{tax}</Text>
                <Text style={globalStyles.subtitle}>{desc}</Text>
                <Text style={globalStyles.subtitle}>{meta}</Text>
                <Text style={globalStyles.subtitle}>{category}</Text>
            </View>

            <View style={styles.buyBottom}>

                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <QPButton title="-1" />
                    <QPButton title="1" />
                    <QPButton title="+1" />
                </View>

                <View style={{ flex: 1 }}>
                    <QPButton title="Comprar" />
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    featuredCard: {
        height: 150,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: '50%',
        height: '90%',
        position: 'absolute',
    },
    productData: {
        flex: 1,
        alignItems: 'flex-start',
    },
    buyBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    leadContainer: {
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: theme.darkColors.success
    },
    leadText: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'Rubik-Bold',
    },
})