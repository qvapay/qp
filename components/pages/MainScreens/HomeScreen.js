import React, { useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, Linking } from 'react-native'
import Hero from '../../ui/Hero'
import Balance from '../../ui/Balance'
import Transactions from '../../ui/Transactions'
import { getMe } from '../../../utils/QvaPayClient';

// Get global AppContext
import { AppContext } from '../../../AppContext';

export default function HomeScreen({ navigation }) {

    // get Me from AppContext
    const { me, setMe } = useContext(AppContext);

    // Get Me object from QvaPayClient and store on state
    const fetchMe = async () => {
        try {
            const me = await getMe(navigation);
            // Set a global me object
            setMe(me);
        } catch (error) {
            console.error(error);
        }
    };

    // get the Me Object from getMe on QvaPayClient
    useEffect(() => {
        fetchMe();
    }, []);

    // request the me object from the server every 60 seconds
    useEffect(() => {
        const interval = setInterval(fetchMe, 120000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Balance me={me} />
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