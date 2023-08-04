import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, TextInput, RefreshControl, TouchableOpacity, Text } from 'react-native'
import { getProducts } from '../../../utils/QvaPayClient';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../../ui/Carousel'
import { theme } from '../../ui/Theme'
import FeaturedCard from '../../ui/FeaturedCard';
import QPSearchBar from '../../ui/QPSearchBar';

export default function ShopIndexScreen() {

    // get navigation hook
    const navigation = useNavigation();
    const [commonProducts, setCommonProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Adjusted Search Logic:
    useEffect(() => {
        if (searchQuery) {
            const filtered = fetchedProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(fetchedProducts);  // show all products when searchQuery is empty
        }
    }, [searchQuery, fetchedProducts]);

    // Swipe to Refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    };

    // Fetch the products from QvaPayClient
    const fetchProducts = async () => {
        const fetchedProducts = await getProducts({ navigation });
        const featuredProducts = fetchedProducts.filter(product => product.featured);
        const commonProducts = fetchedProducts.filter(product => !product.featured);
        setFetchedProducts(fetchedProducts);
        setFeaturedProducts(featuredProducts);
        setCommonProducts(commonProducts);
    };

    const productCard = ({ item, index }) => (
        <View style={styles.cardContainer}>
            <FeaturedCard key={item.uuid} product={item} showLead={false} />
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <QPSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Carousel featuredProducts={featuredProducts} />
                </>
            }
            data={filteredProducts}
            numColumns={2}
            renderItem={productCard}
            columnWrapperStyle={styles.twoCards}
            keyExtractor={(_, index) => index.toString()}
            style={{ backgroundColor: theme.darkColors.background }}

            // Swipe to Refresh code
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />}
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
        marginVertical: 5,
    },
})