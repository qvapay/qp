import React from 'react'
import { Image } from '@rneui/base'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

export default function Card({ header = 'Header', subHeader = '', logo = "" }) {

    // handle Press
    const handlePress = () => {

    }

    return (
        <View style={styles.card}>
            <Pressable onPress={handlePress} >
                <View style={styles.cardHeaders}>
                    <Text style={styles.header}>{header}</Text>
                    <FontAwesome name='chevron-right' style={styles.gray} />
                </View>
                <View>
                    <Image style={styles.visaLogo} source={{ uri: logo }} />
                </View>
                <View>
                    {
                        subHeader && <Text style={styles.subHeader}>{subHeader}</Text>
                    }
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#283046',
    },
    cardHeaders: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Rubik-Medium',
    },
    subHeader: {
        fontSize: 10,
        color: '#7f8c8d',
        fontFamily: 'Rubik-Light',
    },
    visaLogo: {
        height: 120,
        width: '100%',
        resizeMode: 'contain',
    },
    gray: {
        fontSize: 12,
        color: '#7f8c8d',
    },
})