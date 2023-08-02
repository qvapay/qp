import React, { useState, useEffect } from 'react'
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme'
import { StyleSheet, Text, View } from 'react-native'
import { getShortDateTime } from '../../../utils/Helpers';
import { getTransaction } from '../../../utils/QvaPayClient';
import ProfilePictureSection from '../../ui/ProfilePictureSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { theme } from '../../ui/Theme';
import { useNavigation } from '@react-navigation/native';

export default function ShowTransaction({ route }) {

    const { uuid } = route.params;
    const navigation = useNavigation();
    const [user, setUser] = useState({ uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d' });
    const [transaction, setTransaction] = useState({ amount: 0, paid_by: { uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d' } });

    const negative = theme.darkColors.danger;
    const positive = theme.darkColors.success;

    const isNegative = transaction.paid_by.uuid === user.uuid;
    const color = isNegative ? negative : positive;
    const amountSign = isNegative ? "-" : "+";
    const payeer = isNegative ? transaction.owner : transaction.paid_by;
    const [isModalVisible, setModalVisible] = useState(false);

    // get me onject from AsyncStorage and useEffect
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
                    setTransaction(JSON.parse(storedTransaction));
                } else {
                    const response = await getTransaction({ uuid, navigation });
                    await AsyncStorage.setItem(`transaction_${uuid}`, JSON.stringify(response));
                    setTransaction(response);
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        };
        fetchTransaction();
    }, [uuid]);

    return (
        <View style={globalStyles.container}>

            <ProfilePictureSection user={payeer} />

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
                <View style={{ backgroundColor: theme.darkColors.elevation, padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Rubik-Regular' }}>Más detalles:</Text>
                    {
                        transaction.p2p && (
                            <Text>P2P</Text>
                        )
                    }
                    {
                        transaction.servicebuy && (
                            <Text>Service</Text>
                        )
                    }
                    {
                        transaction.withdraw && (
                            <Text>Withdraw</Text>
                        )
                    }
                    {
                        transaction.wallet && (
                            <Text>Wallet In</Text>
                        )
                    }
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
        justifyContent: 'flex-end',
        margin: 0,
    },
});