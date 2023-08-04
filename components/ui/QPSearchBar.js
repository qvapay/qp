import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default function QPSearchBar({ searchQuery, setSearchQuery }) {

    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.expandedSearchBar}>
                <FontAwesome5 name='search' size={14} color='#7f8c8d' />
                <TextInput
                    placeholder="Buscar"
                    style={[styles.searchBarText, { paddingVertical: 6 }]}
                    placeholderTextColor="#7f8c8d"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    // autoFocus={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    expandedSearchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    searchBarText: {
        flex: 1,
        fontSize: 14,
        color: '#7f8c8d',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})