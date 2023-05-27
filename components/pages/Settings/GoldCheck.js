import React, { useContext, useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePictureSection from '../../ui/ProfilePictureSection';

export default function GoldCheck() {

    const { me } = useContext(AppContext);
    const [status, setStatus] = useState(me.golden_check);

    const handleUpgrade = async () => {
        Alert.alert(
            "Compra de Verificación Dorada",
            "¿Quieres adquirir la Verificación Dorada por $5?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Aceptar", onPress: async () => {
                        // Aquí iría la lógica para la compra de la verificación dorada
                        // setStatus('gold');
                    }
                },
            ],
        );
    }

    return (
        <View style={globalStyles.container}>

            <View style={{ flex: 1 }}>
                <Image
                    source={require('../../../assets/images/gold_check.png')} // Asume que tienes una imagen llamada 'gold_check.png' en tu directorio 'assets'
                    style={styles.goldCheckImage}
                />
                <Text style={styles.goldCheckBenefits}>
                    Al adquirir la Verificación Dorada podrás disfrutar de beneficios como mayor visibilidad,
                    mayor límite de transacciones y soporte prioritario.
                </Text>
                <Text style={styles.accountStatus}>
                    Estado de tu cuenta: {status === 'gold' ? "Verificado Dorado" : "Estándar"}
                </Text>
            </View>

            <QPButton
                title={status === 'gold' ? "Extender Verificación Dorada" : "Solicitar Verificación Dorada"}
                onPress={handleUpgrade}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goldCheckImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    goldCheckBenefits: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Nunito-Regular',
    },
    accountStatus: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
        fontFamily: 'Nunito-Regular',
    },
})