import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function Hero({ title = "", subTitle = "", actionText, onActionPress, logoUrl }) {

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6759EF', '#6759EF']} style={styles.gradient}>

                <View style={{ flex: 1, marginVertical: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>

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
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Rubik-Black',
    },
    subTitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Light',
    },
    actionContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    actionButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    actionText: {
        fontSize: 16,
        color: '#3b5998',
        fontFamily: 'Rubik-Regular',
    },
})