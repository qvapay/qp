import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, ScrollView, Linking, RefreshControl } from 'react-native'
import Hero from '../../ui/Hero'
import Balance from '../../ui/Balance'
import Transactions from '../../ui/Transactions'
import { getMe } from '../../../utils/QvaPayClient';
import { AppContext } from '../../../AppContext';
import { globalStyles, theme } from '../../ui/Theme';

export default function HomeScreen({ navigation }) {

    // get Me from AppContext
    const { me, setMe } = useContext(AppContext);
    const [refreshing, setRefreshing] = useState(false);

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
                    tintColor={theme.darkColors.primary}
                    progressBackgroundColor={theme.darkColors.background}
                    colors={['#FFFFFF', '#28c76f']}
                />
            }>

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
        backgroundColor: globalStyles.container.backgroundColor,
    },
})