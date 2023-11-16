import React from 'react'
import AvatarPicture from './AvatarPicture';
import { timeSince, reduceString } from '../../utils/Helpers';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { textStyles, theme } from './Theme';

export default function Transaction({ transaction, navigation }) {

    const { uuid, amount, description, owner, paid_by, updated_at } = transaction;

    const updatedDate = new Date(updated_at);
    const positive = theme.darkColors.success;
    const negative = theme.darkColors.danger;
    const amountFloat = parseFloat(amount);
    const isNegative = amountFloat < 0;
    const color = isNegative ? negative : positive;
    const amountSign = isNegative || "+";
    const amountFixed = amountFloat.toFixed(2);
    const sourceUri = isNegative ? owner.profile_photo_url : paid_by.profile_photo_url;

    const navigateToTransaction = () => navigation.navigate('TransactionStack', { screen: 'TransactionShow', params: { uuid } })

    return (
        <Pressable onPress={navigateToTransaction} style={styles.container}>
            <View style={styles.transactionLogo}>
                <AvatarPicture source_uri={sourceUri} />
            </View>
            <View style={styles.transactionData}>
                <Text style={styles.transactionDescription}>{reduceString(description)}</Text>
                <Text style={textStyles.smallDescription}>{`Hace: ${timeSince(updatedDate)}`}</Text>
            </View>
            <View style={styles.transactionValue}>
                <Text style={[styles.transactionAmount, { color }]}>
                    {amountSign}
                    <Text>{amountFixed.slice(0, -3)}</Text>
                    <Text style={{ fontSize: 10 }}>{amountFixed.slice(-3)}</Text>
                </Text>
                <Text style={styles.transactionStatus}>Completado</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        width: '100%',
        marginVertical: 10,
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
        fontFamily: "Rubik-Regular",
    },
    transactionValue: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    transactionAmount: {
        fontSize: 20,
        fontFamily: "Rubik-Bold",
    },
    transactionStatus: {
        fontSize: 10,
        color: '#9da3b4',
        fontFamily: "Rubik-Light",
    },
})