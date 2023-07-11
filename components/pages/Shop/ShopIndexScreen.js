import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, TextInput, Text } from 'react-native'
import { getProducts } from '../../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// FeaturedCard
import Card from '../../ui/Card'
import Carousel from '../../ui/Carousel'

export default function ShopIndexScreen() {

    const [commonProducts, setCommonProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            const featuredProducts = fetchedProducts.filter(product => product.featured);
            const commonProducts = fetchedProducts.filter(product => !product.featured);
            setFeaturedProducts(featuredProducts);
            setCommonProducts(commonProducts);
        };
        fetchProducts();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.cardContainer}>
            <Card header={item.name} logo={item.logo_url} />
        </View>
    );

    const SearchCartBar = () => (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
                <FontAwesome5 name='search' size={12} color='#7f8c8d' />
                <TextInput
                    placeholder="Buscar"
                    style={styles.searchBarText}
                    placeholderTextColor="#7f8c8d"
                />
            </View>
            <FontAwesome5 name='shopping-cart' size={12} color='#7f8c8d' />
        </View>
    )

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <SearchCartBar />
                    <Carousel featuredProducts={featuredProducts} />
                </>
            }
            data={commonProducts}
            numColumns={2}
            renderItem={renderItem}
            columnWrapperStyle={styles.twoCards}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

const styles = StyleSheet.create({
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
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchBarText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        textTransform: 'none',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})