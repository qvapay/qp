import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import FeaturedCard from './FeaturedCard';

const { width } = Dimensions.get('window');

export default function Carousel({ featuredProducts = [] }) {

    const scrollViewRef = useRef();
    const intervals = featuredProducts.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % intervals; // Loop back to start when we've reached the end
                scrollViewRef.current.scrollTo({ x: newIndex * (width - 40), animated: true });
                return newIndex;
            });
        }, 3000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(timer);
    }, [featuredProducts]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
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
    }
})