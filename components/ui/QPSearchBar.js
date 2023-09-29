import React from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default function QPSearchBar({ searchQuery, setSearchQuery, autoFocus }) {

    return (
        <View style={styles.expandedSearchBar}>
            <FontAwesome5 name='search' size={14} color={theme.darkColors.placeholder} />
            <TextInput
                placeholder="Buscar"
                style={[styles.searchBarText, { paddingVertical: 6 }]}
                placeholderTextColor={theme.darkColors.placeholder}
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
                autoFocus={autoFocus}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    expandedSearchBar: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    searchBarText: {
        fontSize: 14,
        width: '100%',
        color: 'white',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})