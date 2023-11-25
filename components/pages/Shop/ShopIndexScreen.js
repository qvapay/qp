import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native'
import { theme } from '../../ui/Theme'
import Carousel from '../../ui/Carousel'
import QPSearchBar from '../../ui/QPSearchBar'
import FeaturedCard from '../../ui/FeaturedCard'
import { getProducts } from '../../../utils/QvaPayClient'
import { useNavigation } from '@react-navigation/native'
import { shuffleArray } from '../../../utils/Helpers';

export default function ShopIndexScreen() {

    // get navigation hook
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [commonProducts, setCommonProducts] = useState([])
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [fetchedProducts, setFetchedProducts] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

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
        setShowSearchBar(true);
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    };

    // Fetch the products from QvaPayClient
    const fetchProducts = async () => {
        const fetchedProducts = await getProducts({ navigation });
        const featuredProducts = fetchedProducts.filter(product => product.featured);
        const commonProducts = fetchedProducts.filter(product => !product.featured);
        const randomFeaturedProducts = shuffleArray(featuredProducts);
        setCommonProducts(commonProducts);
        setFetchedProducts(fetchedProducts);
        setFeaturedProducts(randomFeaturedProducts);
    };

    const productCard = ({ item, index }) => (
        <View style={styles.cardContainer}>
            <FeaturedCard key={item.uuid} product={item} showLead={false} />
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={
                <View style={{ marginTop: 10 }}>
                    <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
                        <QPSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onClose={() => setShowSearchBar(false)} />
                    </View>
                    <Carousel featuredProducts={featuredProducts} />
                </View>
            }
            data={filteredProducts}
            numColumns={2}
            renderItem={productCard}
            columnWrapperStyle={styles.twoCards}
            keyExtractor={(_, index) => index.toString()}
            style={{ backgroundColor: theme.darkColors.background }}
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