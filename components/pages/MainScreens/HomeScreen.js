import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, ScrollView, Linking, RefreshControl, View } from 'react-native'
import Hero from '../../ui/Hero'
import Balance from '../../ui/Balance'
import Transactions from '../../ui/Transactions'
import { getMe, getProducts } from '../../../utils/QvaPayClient';
import { AppContext } from '../../../AppContext';
import { globalStyles, theme } from '../../ui/Theme';
import Carousel from '../../ui/Carousel'

export default function HomeScreen({ navigation }) {

    // get Me from AppContext
    const { me, setMe } = useContext(AppContext);
    const [refreshing, setRefreshing] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    // Create a flag to know if the component is mounted
    const isMounted = useRef(true);

    // Get the Me object from getMe on QvaPayClient and request it every 120 seconds if component is mounted
    useEffect(() => {
        isMounted.current = true;
        fetchMe();
        const interval = setInterval(() => {
            if (isMounted.current) {
                fetchMe();
            }
        }, 60000);
        return () => {
            isMounted.current = false;
            clearInterval(interval);
        };
    }, []);

    // Get Me object from QvaPayClient and store on state
    const fetchMe = async () => {
        try {
            setRefreshing(true);
            const me = await getMe(navigation);
            setMe(me);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        // Fetch the products from QvaPayClient
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts({ navigation });
            const featuredProducts = fetchedProducts.filter(product => product.featured);
            setFeaturedProducts(featuredProducts);
        };
        fetchProducts();
    }, []);

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchMe}
                    tintColor={theme.darkColors.primary}
                    progressBackgroundColor={theme.darkColors.background}
                    colors={['white', '#28c76f']}
                />
            }>

            <Balance navigation={navigation} me={me} />
            {/* Friends and Business Stories */}
            <Transactions navigation={navigation} />
            <Carousel featuredProducts={featuredProducts} />

            <View style={{ marginHorizontal: 5 }}>
                <Hero
                    actionText={"5 estrellas"}
                    title={"Valóranos \nen TrustPilot"}
                    subTitle={"Ayúdanos a mejorar QvaPay"}
                    onActionPress={() => Linking.openURL('https://www.trustpilot.com/review/qvapay.com')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: globalStyles.container.backgroundColor,
    },
})