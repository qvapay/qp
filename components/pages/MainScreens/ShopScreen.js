import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { globalStyles } from '../../ui/Theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ShopIndex from '../Shop/ShopIndex';

export default function ShopScreen({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <View style={styles.searchBar}>
                <FontAwesome5 name='search' size={12} color='#7f8c8d' />
                <TextInput
                    placeholder="Buscar"
                    style={styles.searchBarText}
                    placeholderTextColor="#7f8c8d"
                />
            </View>
            <ShopIndex />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    searchBarText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        textTransform: 'none',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})