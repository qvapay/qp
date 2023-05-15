import React from 'react'
import { StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height;
const amountInputHeight = 88; // Ajusta este valor según el tamaño real del campo 'amount'
const depositButtonHeight = 100; // Ajusta este valor según el tamaño real del botón 'Depositar'
const titleHeight = 30; // Ajusta este valor según el tamaño real del título
const marginBottom = 90; // Ajusta este valor según los márgenes que deseas mantener
const maxHeight = windowHeight - amountInputHeight - depositButtonHeight - titleHeight * 3 - marginBottom;

export default function ScrollableFlatList({ data, renderItem, keyExtractor, numColumns }) {
    return (
        <ScrollView style={styles.scrollableFlatList}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={numColumns}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollableFlatList: {
        maxHeight: maxHeight,
    },
})