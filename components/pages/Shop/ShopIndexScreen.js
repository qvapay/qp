import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, TextInput, StatusBar, RefreshControl } from 'react-native'
import { getProducts } from '../../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Card from '../../ui/Card'
import Carousel from '../../ui/Carousel'
import { theme } from '../../ui/Theme'

const SearchCartBar = React.memo(({ searchQuery, setSearchQuery }) => (
    <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
            <FontAwesome5 name='search' size={12} color='#7f8c8d' />
            <TextInput
                placeholder="Buscar"
                style={[styles.searchBarText, { paddingVertical: 6 }]}
                placeholderTextColor="#7f8c8d"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
        </View>
        <FontAwesome5 style={styles.cartIcon} name='shopping-cart' size={18} color='#7f8c8d' />
    </View>
));

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
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(theme.darkColors.background);
        }
    }, []);

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
            <Card product={item} />
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <SearchCartBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Carousel featuredProducts={featuredProducts} />
                </>
            }
            data={filteredProducts}
            numColumns={2}
            renderItem={productCard}
            columnWrapperStyle={styles.twoCards}
            keyExtractor={(_, index) => index.toString()}
            // Swipe to Refresh code
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#9Bd35A', '#689F38']} // Multi-color loading indicators
                />
            }
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
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.elevation
    },
    cartIcon: {
        marginLeft: 10,
    },
    searchBarText: {
        flex: 1,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        textTransform: 'none',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})