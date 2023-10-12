import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles, textStyles } from '../../ui/Theme'
import { getShortDateTime, reduceString, saveContact } from '../../../utils/Helpers'
import { getTransaction } from '../../../utils/QvaPayClient'
import ProfilePictureSection from '../../ui/ProfilePictureSection'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ShowTransaction({ route }) {

    const { uuid } = route.params
    const navigation = useNavigation()
    const [user, setUser] = useState({ uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d' })
    const [transaction, setTransaction] = useState({ amount: 0, paid_by: { uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d' } })
    const negative = theme.darkColors.danger
    const positive = theme.darkColors.success
    const isNegative = transaction.paid_by.uuid === user.uuid
    const color = isNegative ? negative : positive
    const amountSign = isNegative ? "-" : "+"
    const payeer = isNegative ? transaction.owner : transaction.paid_by
    const [isModalVisible, setModalVisible] = useState(false)

    // get me object from AsyncStorage and useEffect
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const me = await AsyncStorage.getItem('me');
                if (me) {
                    setUser(JSON.parse(me));
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const storedTransaction = await AsyncStorage.getItem(`transaction_${uuid}`);
                if (storedTransaction) {
                    setTransaction(JSON.parse(storedTransaction))
                    saveContact(isNegative ? transaction.owner : transaction.paid_by)
                } else {
                    const transaction = await getTransaction({ uuid, navigation })
                    await AsyncStorage.setItem(`transaction_${uuid}`, JSON.stringify(transaction))
                    setTransaction(transaction)
                    saveContact(isNegative ? transaction.owner : transaction.paid_by)
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        };
        fetchTransaction();
    }, [uuid]);

    return (
        <View style={globalStyles.container}>

            <ProfilePictureSection user={payeer} size={100} />

            <View style={[globalStyles.section, { flex: 1 }]}>
                <Text style={[globalStyles.amount, { fontSize: 50, color, marginBottom: 0 }]}>
                    {transaction ? `${amountSign} \$${transaction.amount}` : 'Loading...'}
                </Text>
                <Text style={styles.transactionDate}>
                    {getShortDateTime(transaction.updated_at)}
                </Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.description}>
                        {transaction.description}
                    </Text>
                </View>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
                <QPButton title="Más detalles" onPress={() => { setModalVisible(true) }} />
            </View>

            {/** Modal with more Details */}
            <Modal
                isVisible={isModalVisible}
                animationIn={'slideInUp'}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['down']}
                style={styles.modalview}
            >
                <View style={styles.modalContent}>

                    <View style={globalStyles.modalTopBar}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Text style={textStyles.h4}>Total:</Text>
                        <Text style={[textStyles.amount, { fontSize: 18 }]}>$ {transaction.amount}</Text>
                    </View>

                    {
                        transaction.p2p && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                                <Text style={textStyles.h4}>P2P:</Text>
                                <Pressable
                                    onPress={() => navigation.navigate('P2PStack', {
                                        screen: 'P2PShow',
                                        params: { uuid: transaction.p2p.uuid },
                                    })}
                                >
                                    <Text style={textStyles.h4}>{reduceString(transaction.p2p.uuid)}</Text>
                                </Pressable>
                            </View>
                        )
                    }
                    {
                        transaction.servicebuy && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                                <Text style={textStyles.h4}>Servicio:</Text>
                                <Text></Text>
                            </View>
                        )
                    }
                    {
                        transaction.withdraw && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                                <Text style={textStyles.h4}>Extracción:</Text>
                                <Text></Text>
                            </View>
                        )
                    }
                    {
                        transaction.wallet && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                                <Text style={textStyles.h4}>Depósito:</Text>
                                <Text>{JSON.stringify(transaction.wallet)}</Text>
                            </View>
                        )
                    }

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Text style={textStyles.h4}>Estado:</Text>
                        <Text style={textStyles.h6}>{transaction.status}</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}></View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    transactionDate: {
        fontSize: 16,
        color: '#9da3b4',
        marginTop: 0,
    },
    descriptionBox: {
        flex: 1,
        padding: 20,
        width: '100%',
        marginTop: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#192034',
    },
    description: {
        fontSize: 20,
        color: '#9da3b4',
    },
    modalview: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    }
});