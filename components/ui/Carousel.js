import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import FeaturedCard from './FeaturedCard';

const { width } = Dimensions.get('window');

const SLIDER_SPEED = 5000;

export default function Carousel({ featuredProducts = [], widthPadding = 0 }) {

    const scrollViewRef = useRef();
    const intervals = featuredProducts.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % intervals; // Loop back to start when we've reached the end
                scrollViewRef.current.scrollTo({ x: newIndex * (width - widthPadding), animated: true });
                return newIndex;
            });
        }, SLIDER_SPEED);
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
                {
                    featuredProducts.map((product, index) => (
                        <FeaturedCard key={product.uuid} product={product} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    }
})