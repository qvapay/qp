import React, { useContext, useState, useEffect } from 'react'
import { Alert, StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import QPButton from '../../ui/QPButton';
import { globalStyles, theme } from '../../ui/Theme';
import { AppContext } from '../../../AppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { buyGoldCheck } from '../../../utils/QvaPayClient';
import Loader from '../../ui/Loader';
import { useNavigation } from '@react-navigation/native';

const GOLD_CHECK_PRICE = 5;

export default function GoldCheck() {

    const navigation = useNavigation();
    const { me } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(me.golden_check);
    const [balanceError, setBalanceError] = useState(false);

    // set headerRight with the Current Balance
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.balance}>
                    <Text style={styles.balanceText}>
                        $ {me.balance}
                    </Text>
                </View>
            ),
        });
    }, []);

    // if me.balance is less than total then disable the button and show {value} in red color, so create a state for truye or false
    useEffect(() => {
        if (me.balance < GOLD_CHECK_PRICE) {
            setBalanceError(true);
        } else {
            setBalanceError(false);
        }
    }, [me.balance]);

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
                                console.log(response)
                            }
                        } catch (error) {
                            console.log(error)

                            // Send a notification to the user
                            Alert.alert(
                                "Error",
                                "No se pudo realizar la compra de la Verificación Dorada"
                            );
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
                        source={require('../../../assets/images/gold-check-hero.png')} // Asume que tienes una imagen llamada 'gold_check.png' en tu directorio 'assets'
                        style={styles.goldCheckImage}
                    />

                    <View style={styles.box}>
                        <Text style={styles.goldCheckBenefits}>
                            Al adquirir la Verificación Dorada podrás disfrutar de beneficios como mayor visibilidad,
                            mayor límite de transacciones y soporte prioritario.
                        </Text>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="percent" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Rubik-Bold', color: '#fff', fontSize: 16 }}>0% FEES EN EL P2P</Text>
                            <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 14 }}>No cobramos comisiones en el P2P</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 16 }}>
                            <FontAwesome5 name="comments-dollar" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Rubik-Bold', color: '#fff', fontSize: 16 }}>MÁS OPERACIONES</Text>
                            <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 14 }}>Podrás realizar más operaciones diarias</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { flexDirection: 'row', alignContent: 'center', alignItems: 'center' }]} >
                        <View style={{ marginRight: 20 }}>
                            <FontAwesome5 name="check" size={24} style={{ color: '#fff' }} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Rubik-Bold', color: '#fff', fontSize: 16 }}>CHECK DORADO</Text>
                            <Text style={{ fontFamily: 'Rubik-Regular', color: '#fff', fontSize: 14 }}>Tu cuenta aparece con un check dorado</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={styles.accountStatus}>Estado de tu cuenta:</Text>
                        <Text style={styles.accountStatus}>{status ? "GOLD" : "Estándar"}</Text>
                    </View>

                    {
                        status == 1 && (
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={styles.accountStatus}>Activo hasta:</Text>
                                <Text style={styles.accountStatus}>{me.golden_expire}</Text>
                            </View>
                        )
                    }

                </View>

            </ScrollView>

            <QPButton title={status ? "Extender Verificación Dorada" : "Solicitar Verificación Dorada"} onPress={handleUpgrade} disabled={balanceError} />

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
        backgroundColor: theme.darkColors.elevation,
    },
    goldCheckImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    goldCheckBenefits: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
    },
    accountStatus: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
        fontFamily: 'Rubik-Regular',
    },
    balance: {
        borderRadius: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: theme.darkColors.elevation,
    },
    balanceText: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: "Rubik-Bold",
    },
})