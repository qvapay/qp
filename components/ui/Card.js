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
                    <Text style={styles.white}>{header}</Text>
                    <FontAwesome name='chevron-right' style={styles.gray} />
                </View>
                <View>
                    <Image style={styles.visaLogo} source={{ uri: logo }} />
                </View>
                <View>
                    {
                        subHeader && <Text style={[styles.gray, { fontSize: 10 }]}>{subHeader}</Text>
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
        // backgroundColor: 'red',
    },
    cardHeaders: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    white: {
        fontSize: 14,
        color: '#fff',

    },
    gray: {
        fontSize: 12,
        color: '#7f8c8d',

    },
    visaLogo: {
        height: 120,
        width: '100%',
        resizeMode: 'contain',
    },
})