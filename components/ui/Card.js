import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function Card({ product }) {

    // navigation hook
    const navigation = useNavigation();

    const { uuid, name, lead, color, price, tax, desc, meta, category, logo_url, cover_url } = product;

    // navigate to ShopStack with params ShopScreen
    const handlePress = () => {
        navigation.navigate('ShopStack', {
            screen: 'ShopItemScreen',
            params: { uuid: uuid }
        });
    };

    return (
        <Pressable onPress={handlePress} style={styles.card}>

            <View style={{ backgroundColor: color, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
                <FastImage
                    style={styles.cover}
                    source={{
                        uri: cover_url == "https://media.qvapay.com/services/default.png" ? logo_url : cover_url,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>

            <View style={styles.cardBottomInfo}>
                <View>
                    <FastImage
                        style={styles.logo}
                        source={{
                            uri: logo_url,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <Text numberOfLines={1} style={styles.header}>{name}</Text>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    cardBottomInfo: {
        overflow: 'hidden',
        paddingVertical: 4,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        fontSize: 12,
        marginLeft: 6,
        overflow: 'hidden',
        color: 'black',
        fontFamily: 'Rubik-Medium',
    },
    logo: {
        height: 20,
        width: 20,
        resizeMode: 'cover',
    },
    cover: {
        height: 100,
        width: '100%',
        resizeMode: 'contain',
    },
})