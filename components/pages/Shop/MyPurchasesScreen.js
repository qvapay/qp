import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { getMyPurchases } from '../../../utils/QvaPayClient';
import { globalStyles } from '../../ui/Theme';
import { useNavigation } from '@react-navigation/native';

export default function MyPurchasesScreen() {

    const navigation = useNavigation();
    const [myPurchases, setMyPurchases] = useState([]);

    // useEffect fopr fetching the data
    useEffect(() => {
        const fetchMyPurchases = async () => {
            try {
                const myPurchasesResponse = await getMyPurchases({ navigation });
                if (myPurchasesResponse?.data?.length > 0) {
                    setMyPurchases(myPurchasesResponse.data);
                } else {
                    setMyPurchases([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyPurchases();
    }, []);

    console.log(myPurchases)

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={myPurchases}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        
                        <Text style={styles.itemTitle}>{item.service.name}</Text>
                        <Text style={styles.itemPrice}>${item.transaction?.amount}</Text>

                        <Text style={styles.itemTitle}>Estado:</Text>
                        <Text style={styles.itemDescription}>{item.status}</Text>

                        <Text style={styles.itemTitle}>Comprado el:</Text>
                        <Text style={styles.itemDescription}>{item.created_at}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
    },
    itemDescription: {
        fontSize: 14,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
})