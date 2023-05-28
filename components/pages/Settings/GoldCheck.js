import React, { useContext, useState } from 'react'
import { Alert, Image, StyleSheet, ScrollView, Text, View } from 'react-native';
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

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../../../assets/images/gold_check.png')} // Asume que tienes una imagen llamada 'gold_check.png' en tu directorio 'assets'
                        style={styles.goldCheckImage}
                    />

                    <Text style={[styles.goldCheckBenefits, styles.box]}>
                        Al adquirir la Verificación Dorada podrás disfrutar de beneficios como mayor visibilidad,
                        mayor límite de transacciones y soporte prioritario.
                    </Text>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="gift" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>INVITAR AMIGOS</Text>
                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>Invita a tus amigos y gana dinero</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="gift" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>INVITAR AMIGOS</Text>
                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>Invita a tus amigos y gana dinero</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="gift" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>INVITAR AMIGOS</Text>
                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>Invita a tus amigos y gana dinero</Text>
                        </View>
                    </View>

                    <Text style={styles.accountStatus}>
                        Estado de tu cuenta: {status === 'gold' ? "Verificado Dorado" : "Estándar"}
                    </Text>

                </View>


            </ScrollView>

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
    box: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#283046',
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