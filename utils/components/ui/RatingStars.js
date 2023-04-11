import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function RatingStars({ rating, size = 14, fontSize = 16 }) {

    // Try to convert the rating to a number
    try {
        rating = parseFloat(rating);
    } catch (error) {
        rating = 0;
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesome5 key={`full-${i}`} name="star" size={size} color="#f1c40f" />);
    }

    if (halfStar) {
        stars.push(<FontAwesome5 key="half" name="star-half" size={size} color="#f1c40f" />);
    }

    return (
        <View style={styles.mainView}>
            {stars}
            <Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize, marginLeft: 10, marginTop: 1 }}>
                {rating.toFixed(1)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})