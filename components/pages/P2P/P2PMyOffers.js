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
    const [loading, setLoading] = useState(false)

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
            console.error('Error fetching P2P Offers:', error);
        }
    }

    return (
        <View style={globalStyles.container}>

            <Text style={textStyles.h1}>Mis Ofertas P2P:</Text>

            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={textStyles.h3}>Cargando...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={myOffers}
                        renderItem={({ item }) => (
                            <P2POffer offer={item} navigation={navigation} extended={true} />
                        )}
                        keyExtractor={item => item.uuid}
                    />
                )
            }

        </View>
    )
}

export default P2PMyOffers