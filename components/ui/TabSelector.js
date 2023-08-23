import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { theme } from './Theme'

export default function TabSelector({ selected, setSelected, pricingTiers }) {

    return (
        <View style={styles.tabContainer}>
            {pricingTiers.map((tier) => (
                <Pressable
                    key={tier.id}
                    style={[styles.tabButton, { backgroundColor: selected == tier.id ? theme.darkColors.primary : theme.darkColors.elevation }]}
                    onPress={() => setSelected(tier.id)}
                >
                    <View>
                        <Text style={styles.tabButtonLabel}>{tier.label}</Text>
                        <Text style={styles.tabButtonText}>{tier.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.tabButtonPrice}>${tier.price} </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tabButton: {
        width: '100%',
        borderWidth: 3,
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderColor: theme.darkColors.primary,
        backgroundColor: theme.darkColors.elevation,
    },
    tabButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Rubik-Regular',
    },
    tabButtonLabel: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik-Regular',
    },
    tabButtonPrice: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
})