import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function FeaturedCard() {
    return (
        <View style={styles.featuredcard}>
            <Text>FeaturedCard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    featuredcard: {
        flex: 1,
        height: 150,
        borderRadius: 10,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#283046',
    },
})