import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getP2POffer } from '../../../utils/QvaPayClient'
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import RatingStars from '../../ui/RatingStars';
import AvatarPicture from '../../ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ShowP2p({ route, navigation }) {

    const { uuid } = route.params;
    const [offer, setOffer] = useState({})

    // get the Offer from getP2POffer function
    useEffect(() => {
        const getOffer = async () => {
            const response = await getP2POffer({ uuid, navigation });
            console.log(response)
            setOffer(response);
        }
        getOffer();
    }, [])

    console.log(offer)

    // Apply to an offer and change the status to "applied"
    const applyToOffer = () => {
    }

    return (
        <View style={globalStyles.container}>

            <View style={styles.peerOwnerContainer}>
                <AvatarPicture size={48} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.peerName}>{offer.owner?.username}</Text>
                    <RatingStars rating={5.0} fontSize={12} size={10} />
                </View>
            </View>

            <View style={styles.offerReceiveSend}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name='arrow-down' size={26} color='#28c76f' />
                    <Text style={styles.offerAmount}>$ {offer.amount}</Text>
                </View>
                <View style={styles.grayDivider}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name='arrow-up' size={26} color='#ea5455' />
                    <Text style={styles.offerReceive}>$ {offer.receive}</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.offerLabelText}>
                    A:IUGWEIOF:UWBEGO"FWEFWEF
                </Text>
            </View>

            <QPButton title="Aplicar a oferta" onPress={applyToOffer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#161d31',
    },
    peerOwnerContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'red',
    },
    peerName: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito-Medium'
    },
    offerReceiveSend: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#283046'
    },
    offerLabel: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'green'
    },
    offerLabelText: {
        color: 'white',
        fontFamily: 'Nunito-Medium'
    },
    offerAmount: {
        fontSize: 28,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Nunito-Black',
    },
    offerReceive: {
        fontSize: 28,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Nunito-Black',
    },
    grayDivider: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    }
})