import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function Hero({ title = "", subTitle = "", actionText, onActionPress, logoUrl }) {

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#006A4E', '#1B4D3E']} style={styles.gradient}>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>

                <Pressable onPress={onActionPress} style={styles.actionContainer}>
                    <View style={styles.actionButton}>
                        <Text style={styles.actionText}>{actionText}</Text>
                    </View>
                </Pressable>

            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    gradient: {
        paddingTop: 10,
        paddingLeft: 20,
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Nunito-Black',
    },
    subTitle: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Nunito-Light',
    },
    actionContainer: {
        alignItems: 'flex-end',
    },
    actionButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    actionText: {
        fontSize: 16,
        color: '#3b5998',
        fontFamily: 'Nunito-Regular',
    },
})