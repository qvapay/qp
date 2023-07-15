import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';

export default function ShopCheckoutScreen({route}) {

    // navigation hook
    const navigation = useNavigation();

    // Get from params: uuid, amount to calculate total

    return (
        <View style={globalStyles.container}>
            <Text>ShopCheckoutScreen</Text>



        </View>
    )
}

const styles = StyleSheet.create({})