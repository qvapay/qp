import React, { useEffect, useState } from 'react'
import Card from '../../ui/Card'
import { FlatList, StyleSheet, View } from 'react-native'
import { getProducts } from '../../../utils/QvaPayClient';

export default function ShopIndex() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.cardContainer}>
            <Card
                header={item.name}
                logo={item.service_photo_url}
            />
        </View>
    );

    return (
        <FlatList
            data={products}
            numColumns={2}
            renderItem={renderItem}
            columnWrapperStyle={styles.twoCards}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

const styles = StyleSheet.create({
    bigPromo: {
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    bigPromoText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',

    },
    twoCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    twoCards: {
        justifyContent: 'space-between',
    },
})