import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import LottieView from "lottie-react-native";
import { textStyles } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';
import { useNavigation } from '@react-navigation/native';

export default function CompletedPayment({ uuid = "" }) {

    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <LottieView source={require('../../../assets/lotties/completed.json')} autoPlay loop={false} style={styles.loadingAnimation} />

                <Text style={textStyles.h2}>Pago completado</Text>
                <Text style={[textStyles.h6, { textAlign: 'center' }]}>Hemos procesado este pago y estará en su destino en pocos segundos.</Text>
            </View>

            <QPButton title="Ver Transacción" onPress={() => { navigation.navigate('TransactionStack', { screen: 'TransactionShow', params: { uuid } }) }} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmarkContainer: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#4cd964',
        justifyContent: 'center',
    },
    loadingAnimation: {
        width: 500,
        height: 350,
    }
});  