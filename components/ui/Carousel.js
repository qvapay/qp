import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import FeaturedCard from './FeaturedCard';

export default function Carousel({ featuredProducts = [] }) {

    // Get featuredProducts from props
    const intervals = featuredProducts.length;

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: `${100 * intervals}%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
            >
                {featuredProducts.map((product, index) => (
                    <FeaturedCard
                        key={product.uuid}
                        product={product}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        // backgroundColor: '#283046', //TODO: Remove this when ready
    }
})