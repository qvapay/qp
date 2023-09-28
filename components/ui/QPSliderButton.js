import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import SlideButton from 'rn-slide-button';
import { theme } from './Theme'

export default function QPSliderButton({ danger, disabled, title = "QPSlider", onSlideEnd }) {

    return (
        <View style={{ marginRight: 5 }}>
            <SlideButton
                title={title}
                /* disabled */
                height={50}
                borderRadius={10}
                completeThreshold={90}
                titleStyle={styles.titleStyle}
                titleContainerStyle={styles.titleContainerStyle}
                iconColor={theme.darkColors.primary}
                thumbStyle={{ backgroundColor: 'white' }}
                containerStyle={{ backgroundColor: theme.darkColors.primary }}
                underlayStyle={{ backgroundColor: "#7767F7" }}
                animation={true}
                icon={<Image style={{ width: 32, height: 32 }} source={require('../../assets/images/qvapay-logo.png')} />}
                onSlideStart={() => console.log('slide started')}
                onSlideEnd={onSlideEnd}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'Rubik-Medium'
    },
    titleContainerStyle: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.darkColors.primary
    }
})