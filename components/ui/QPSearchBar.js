import React from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default function QPSearchBar({ searchQuery, setSearchQuery, autoFocus, onClose }) {

    return (
        <View style={styles.searchBarContainer}>
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
                <Pressable onPress={onClose} style={{ marginRight: 5 }}>
                    <FontAwesome5 name='times' size={14} color={theme.darkColors.placeholder} />
                </Pressable>
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
        fontSize: 16,
        color: 'white',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
})