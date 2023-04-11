import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, Linking } from 'react-native'
import { AppContext } from '../../../AppContext';
import Hero from '../../ui/Hero'
import Balance from '../../ui/Balance'
import Transactions from '../../ui/Transactions'
import { getMe } from '../../../utils/QvaPayClient';

export default function HomeScreen({ navigation }) {

    // useState for me object
    const [me, setMe] = useState({ balance: 0 });

    // Get Me object from QvaPayClient and store on state
    const fetchMe = async () => {
        try {
            const me = await getMe(navigation);
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