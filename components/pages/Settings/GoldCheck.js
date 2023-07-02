import React, { useContext, useState } from 'react'
import { Alert, Image, StyleSheet, ScrollView, Text, View } from 'react-native';
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../ui/Loader';

// Import buyGoldCheck from QvaPayClient
import { buyGoldCheck } from '../../../utils/QvaPayClient';

export default function GoldCheck({ navigation }) {

    const { me } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(me.golden_check);

    const handleUpgrade = async () => {
        Alert.alert(
            "Compra de Verificación Dorada",
            "¿Quieres adquirir la Verificación Dorada por $5?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Aceptar", onPress: async () => {
                        setLoading(true);
                        try {
                            const response = await buyGoldCheck({ navigation });
                            if (response.status === 201) {
                                setStatus(true);
                            } else {
                                // handle error here
                                console.log(response)
                            }
                        } catch (error) {
                            // handle error here
                            console.log(error)
                        }
                        setLoading(false);
                    }
                },
            ],
        );
    }

    return (
        <View style={globalStyles.container}>

            <Loader loading={loading} />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../../../assets/images/gold_check_hero.png')}
                        style={styles.goldCheckImage}
                    />

                    <Text style={[styles.goldCheckBenefits, styles.box]}>
                        Al adquirir la Verificación Dorada podrás disfrutar de beneficios como mayor visibilidad,
                        mayor límite de transacciones y soporte prioritario.
                    </Text>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="percent" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>0% FEES EN EL P2P</Text>
                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>No cobramos comisiones en el P2P</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 16 }}>
                            <FontAwesome5 name="comments-dollar" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>MÁS OPERACIONES</Text>
                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>Podrás realizar más operaciones diarias</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="check" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 16 }}>CHECK DORADO</Text>
                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#fff', fontSize: 14 }}>Tu cuenta aparece con un check dorado</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={styles.accountStatus}>Estado de tu cuenta:</Text>
                        <Text style={styles.accountStatus}>{status ? "GOLD" : "Estándar"}</Text>
                    </View>

                    {
                        status && (
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={styles.accountStatus}>Activo hasta:
                                </Text>
                                <Text style={styles.accountStatus}>{me.golden_expire}</Text>
                            </View>
                        )
                    }

                </View>

            </ScrollView>

            <QPButton
                title={status ? "Extender Verificación Dorada" : "Solicitar Verificación Dorada"}
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
        width: '100%',
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
        fontFamily: 'Nunito-Regular',
    },
})