import React from 'react'
import AvatarPicture from './AvatarPicture';
import { timeSince, reduceString } from '../../utils/Helpers';
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Transaction({ transaction, navigation }) {

    const { uuid, amount, description, owner, paid_by, updated_at } = transaction;

    // convert into Date object the updated_at string
    const updatedDate = new Date(updated_at);

    // Positive/Negative colors
    const positive = "#28c76f";
    const negative = "#ea5455";

    // Convert amount to float
    const amountFloat = parseFloat(amount);

    // Determine if the transaction is negative or positive based on amount sign
    const isNegative = amountFloat < 0;

    // Now we can use the isNegative variable to determine the color of the transaction
    const color = isNegative ? negative : positive;

    // Put a "+" or "-" sign in front of the amount
    const amountSign = isNegative || "+";

    // Set always a two decimal for the amount
    const amountFixed = amountFloat.toFixed(2);

    // If is negative use the owner avatar, if not use the paid_by avatar
    const sourceUri = isNegative ? owner.profile_photo_url : paid_by.profile_photo_url;

    // Navigation function to ShowTransaction screen
    const navigateToTransaction = () => {
        navigation.navigate('TransactionStack', {
            screen: 'ShowTransaction',
            params: { uuid },
        })
    }

    return (
        <Pressable onPress={navigateToTransaction}>
            <View style={styles.container}>
                <View style={styles.transactionLogo}>
                    <AvatarPicture source_uri={sourceUri} />
                </View>
                <View style={styles.transactionData}>
                    <Text style={styles.transactionDescription}>{reduceString(description)}</Text>
                    <Text style={styles.transactionDescription2}>{`Hace: ${timeSince(updatedDate)}`}</Text>
                </View>
                <View style={styles.transactionValue}>
                    <Text style={[styles.transactionAmount, { color }]}>{amountSign}{amountFixed}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    transactionLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    transactionData: {
        flex: 1,
        flexDirection: 'column'
    },
    transactionDescription: {
        fontSize: 16,
        color: 'white',
        fontFamily: "Nunito-Regular",
    },
    transactionDescription2: {
        fontSize: 14,
        color: '#9da3b4',
        fontFamily: "Nunito-Light",
    },
    transactionAmount: {
        fontSize: 16,
        fontFamily: "Nunito-Black",
    },
})