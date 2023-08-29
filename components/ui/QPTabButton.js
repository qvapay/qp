import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import LottieView from "lottie-react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { textStyles, theme } from './Theme';

export default function QPTabButton({ title, subtitle, logo, active, onPress }) {

    const lottie = require('../../assets/lotties/id.json');

    const lottieMap = {
        id: require('../../assets/lotties/id.json'),
        faceid: require('../../assets/lotties/faceid.json'),
        security: require('../../assets/lotties/security.json'),
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View>
                <LottieView source={lottieMap[logo]} autoPlay style={styles.lottie} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={textStyles.h3}>{title}</Text>
                <Text style={textStyles.h6}>{subtitle}</Text>
            </View>
            <View>
                <BouncyCheckbox
                    size={30}
                    isChecked={active}
                    disableBuiltInState
                    fillColor={theme.darkColors.primary}
                    unfillColor={theme.darkColors.background}
                    iconStyle={{ borderColor: theme.darkColors.primary }}
                    innerIconStyle={{ borderWidth: 1 }}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.darkColors.elevation,
        justifyContent: 'space-between',
    },
    lottie: {
        width: 60,
        height: 60,
        alignSelf: 'center',
    },
})