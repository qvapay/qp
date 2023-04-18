import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getP2POffer } from '../../../utils/QvaPayClient'

export default function ShowP2p({ route, navigation }) {

    const { uuid } = route.params;
    const [offer, setOffer] = useState({})

    console.log(offer)

    // get the Offer from getP2POffer function
    useEffect(() => {
        const getOffer = async () => {
            const response = await getP2POffer({ uuid, navigation });
            setOffer(response);
        }
        getOffer();
    }, [])

    return (
        <View>
            <Text>ASD</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})