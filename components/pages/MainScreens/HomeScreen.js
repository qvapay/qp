import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, ScrollView, Linking, RefreshControl } from 'react-native'
import Hero from '../../ui/Hero'
import Balance from '../../ui/Balance'
import Transactions from '../../ui/Transactions'
import { getMe } from '../../../utils/QvaPayClient';
import { AppContext } from '../../../AppContext';

export default function HomeScreen({ navigation }) {

    // get Me from AppContext
    const { me, setMe } = useContext(AppContext);
    const [refreshing, setRefreshing] = useState(false);

    // Get Me object from QvaPayClient and store on state
    const fetchMe = async () => {
        try {
            setRefreshing(true);
            console.log("getMe HomeScreen" , me)
            const me = await getMe(navigation);
            console.log("getMe HomeScreen" , me)
            setMe(me);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
            setRefreshing(false);
        }
    };

    // Get the Me object from getMe on QvaPayClient and request it every 120 seconds
    useEffect(() => {
        fetchMe();
        const interval = setInterval(fetchMe, 120000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchMe}
                    tintColor="#7367f0"
                    progressBackgroundColor="#161d31"
                    colors={['#FFFFFF', '#28c76f']}
                />
            }
        >
            <Balance navigation={navigation} me={me} />
            <Transactions navigation={navigation} />
            <Hero
                actionText={"5 estrellas"}
                title={"Valóranos \nen TrustPilot"}
                subTitle={"Ayúdanos a mejorar QvaPay"}
                onActionPress={() => Linking.openURL('https://www.trustpilot.com/review/qvapay.com')}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#161d31',
    },
})