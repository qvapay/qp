import React, { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native'
import P2POffer from '../../ui/P2POffer'
import { apiRequest } from '../../../utils/QvaPayClient'
import { useNavigation } from '@react-navigation/native'
import { globalStyles, textStyles } from '../../ui/Theme'

const P2PMyOffers = () => {

    // Load my P2P Offers
    const navigation = useNavigation();
    const [myOffers, setMyOffers] = useState([])

    useEffect(() => {
        getMyOffers()
    }, [])

    const getMyOffers = async () => {
        try {
            let url = `/p2p/my`
            const response = await apiRequest(url, { method: "GET" }, navigation)
            setMyOffers(response.data)
        } catch (error) {
            console.error('Error fetching P2P Offers:', error);
        }
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={myOffers}
                renderItem={({ item }) => (
                    <P2POffer offer={item} navigation={navigation} />
                )}
                keyExtractor={item => item.uuid}
            />
        </View>
    )
}

export default P2PMyOffers