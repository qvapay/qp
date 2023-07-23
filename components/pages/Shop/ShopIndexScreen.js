import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, TextInput, StatusBar, RefreshControl, TouchableOpacity, Text } from 'react-native'
import { getProducts } from '../../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Card from '../../ui/Card'
import Carousel from '../../ui/Carousel'
import { theme } from '../../ui/Theme'

// import featured Card from ui
import FeaturedCard from '../../ui/FeaturedCard';


const SearchCartBar = React.memo(({ searchQuery, setSearchQuery, gotoMyPurchases }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    return (
        <View style={styles.searchBarContainer}>
            {isSearchFocused ? (
                <>
                    <View style={styles.expandedSearchBar}>
                        <FontAwesome5 name='search' size={14} color='#7f8c8d' />
                        <TextInput
                            placeholder="Buscar"
                            style={[styles.searchBarText, { paddingVertical: 6 }]}
                            placeholderTextColor="#7f8c8d"
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                            onBlur={() => setIsSearchFocused(false)}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.myPurchasesButtonCollpased} onPress={gotoMyPurchases}>
                        <FontAwesome5 style={{ marginHorizontal: 10, }} name='shopping-cart' size={14} color='white' />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={() => setIsSearchFocused(true)}>
                        <View style={styles.iconSearchBar}>
                            <FontAwesome5 name='search' size={14} color='#7f8c8d' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.myPurchasesButton} onPress={gotoMyPurchases}>
                        <FontAwesome5 style={styles.cartIcon} name='shopping-cart' size={14} color='white' />
                        <Text style={styles.myPurchasesText}>Mis Compras</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
});

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
            <FeaturedCard key={item.uuid} product={item} showLead={false} />
        </View>
    );

    // Go to MyPurchasesScreen via navigation using ShopStack
    const gotoMyPurchases = () => {
        navigation.navigate('ShopStack', {
            screen: 'MyPurchasesScreen'
        });
    };

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <SearchCartBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} gotoMyPurchases={gotoMyPurchases} />
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
                    colors={['#9Bd35A', '#689F38']}
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
        marginVertical: 5,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    expandedSearchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    iconSearchBar: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchBarText: {
        flex: 1,
        fontSize: 14,
        color: '#7f8c8d',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
    cartIcon: {
        marginRight: 10,
    },
    myPurchasesButton: {
        flex: 1,
        borderRadius: 10,
        marginVertical: 2,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: theme.darkColors.primary,
    },
    myPurchasesButtonCollpased: {
        borderRadius: 10,
        marginLeft: 10,
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.darkColors.primary,
    },
    myPurchasesText: {
        fontSize: 16,
        color: 'white',
        fontFamily: "Rubik-Regular",
    },
})