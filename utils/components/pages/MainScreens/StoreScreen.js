import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native'
import Card from '../../ui/Card'
import { globalStyles } from '../../ui/Theme';
import { qvaPayClient } from '../../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function StoreScreen() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await qvaPayClient.get('/services');
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    };
    
    const renderItem = ({ item, index }) => (
        <View style={styles.cardContainer}>
            <Card
                header={item.name}
                logo={item.service_photo_url}
            />
        </View>
    );

    return (
        <View style={globalStyles.container}>
            <View style={styles.searchBar}>
                <FontAwesome5 name='search' size={12} color='#7f8c8d' />
                <TextInput
                    placeholder="Buscar"
                    style={styles.searchBarText}
                    placeholderTextColor="#7f8c8d"
                />
            </View>
            <FlatList
                data={products}
                numColumns={2}
                renderItem={renderItem}
                columnWrapperStyle={styles.twoCards}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    searchBarText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontFamily: "Nunito-Regular",
    },
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