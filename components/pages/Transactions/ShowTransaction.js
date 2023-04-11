import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../ui/Theme'
import { StyleSheet, Text, View } from 'react-native'
import { getTransaction } from '../../../utils/QvaPayClient';
import ProfilePictureSection from '../../ui/ProfilePictureSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QPButton from '../../ui/QPButton';
import { getShortDateTime } from '../../../utils/Helpers';

export default function ShowTransaction({ route, navigation }) {

    const { uuid } = route.params;
    const [user, setUser] = useState({ uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d' });
    const [transaction, setTransaction] = useState({ amount: 0, paid_by: { uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d' } });

    // Positive/Negative colors
    const positive = "#28c76f";
    const negative = "#ea5455";

    // Convert amount to float
    const amountFloat = parseFloat(transaction.amount);

    // If the transaction paid_by is the current user, then the transaction is negative
    const isNegative = transaction.paid_by.uuid === user.uuid;

    // Now we can use the isNegative variable to determine the color of the transaction
    const color = isNegative ? negative : positive;

    // Put a "+" or "-" sign in front of the amount
    const amountSign = isNegative ? "-" : "+";

    // Image source
    const payeer = isNegative ? transaction.owner : transaction.paid_by;

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

            <View style={[globalStyles.section, { flex: 2 }]}>

                <Text style={[globalStyles.amount, { fontSize: 50, color, marginBottom: 0 }]}>
                    {transaction ? `${amountSign}${transaction.amount}` : 'Loading...'}
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
                <QPButton title="Repetir Pago" onPress={() => navigation.navigate("KeypadScreen")} />
            </View>
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
        fontSize: 30,
        color: '#9da3b4',
    },
});