import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, RefreshControl, View, Text } from 'react-native'
import P2POffer from '../../ui/P2POffer'
import LottieView from 'lottie-react-native'
import { apiRequest } from '../../../utils/QvaPayClient'
import { useNavigation } from '@react-navigation/native'
import { globalStyles, textStyles } from '../../ui/Theme'

export default function P2PMyOffers() {

    const navigation = useNavigation();
    const [myOffers, setMyOffers] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getMyOffers()
    }, [])

    const getMyOffers = async () => {
        try {
            setLoading(true)
            let url = `/p2p/my`
            const response = await apiRequest(url, { method: "GET" }, navigation)
            setMyOffers(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching P2P Offers:', error)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        getMyOffers()
        setRefreshing(false)
    }

    return (
        <View style={globalStyles.container}>

            <Text style={textStyles.h1}>Mis Ofertas P2P:</Text>

            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView source={require('../../../assets/lotties/spinner.json')} autoPlay style={styles.lottie} />
                    </View>
                ) : (
                    <FlatList
                        data={myOffers}
                        renderItem={({ item }) => (
                            <P2POffer offer={item} navigation={navigation} extended={true} />
                        )}
                        keyExtractor={item => item.uuid}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 160,
        height: 160,
        alignSelf: 'center',
    },
})