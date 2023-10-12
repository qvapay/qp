import React, { useContext, useEffect, useState } from 'react'
import QR from '../ui/QR';
import { AppContext } from '../../AppContext'
import { textStyles, theme } from '../ui/Theme'
import { apiRequest } from '../../utils/QvaPayClient'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureSection from '../ui/ProfilePictureSection'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import DeviceBrightness from '@adrianso/react-native-device-brightness'

export default function ProfileScreen({ route }) {

    const navigation = useNavigation();
    const { me, setBackgroundColor } = useContext(AppContext);
    const amount = route.params?.amount || 0;
    const { qrData = `qp://u:${me.username}:a:${amount}` } = me;
    const [initialBrightness, setInitialBrightness] = useState(null);
    const [extendedMe, setExtendedMe] = useState({ completed_p2p: 0, ranking_position: 10000 });

    // Set the max brightness on screen
    useEffect(() => {
        setTimeout(() => {
            setBackgroundColor(theme.darkColors.almost_white);
        }, 150);

        // Guardar el brillo actual para poder restaurarlo luego
        DeviceBrightness.getBrightnessLevel().then((brightness) => {
            setInitialBrightness(brightness);
            DeviceBrightness.setBrightnessLevel(1);
        });

        // Limpiar la función de efecto para que se ejecute solo una vez
        return () => {
            // return the setBackgroundColor to primary
            setBackgroundColor(theme.darkColors.background);
            if (initialBrightness !== null) {
                DeviceBrightness.setBrightnessLevel(initialBrightness);
            }
        };

    }, [initialBrightness]);

    // Now lets get more extended data from the API
    useEffect(() => {
        const getExtendedData = async () => {
            try {
                const url = `/user/extended`
                const response = await apiRequest(url, { method: 'GET' }, navigation);
                setExtendedMe(response);
                return response;
            } catch (error) {
                console.error('Error verifying OTP:', error);
                return {};
            }
        };
        getExtendedData();
    }, []);

    return (
        <>
            <Pressable style={styles.container} onPress={() => navigation.goBack()}>

                <ProfilePictureSection user={me} negative={true} size={100} />

                <View style={styles.statsContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { color: 'black', textAlign: 'center', marginVertical: 0 }]}>{extendedMe.completed_p2p}</Text>
                        <Text style={[textStyles.h6, { color: 'black', textAlign: 'center' }]}>P2P</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { color: 'black', textAlign: 'center', marginVertical: 0 }]}>{extendedMe.ranking_position}</Text>
                        <Text style={[textStyles.h6, { color: 'black', textAlign: 'center' }]}>Ranking</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { color: 'black', textAlign: 'center', marginVertical: 0 }]}>{extendedMe.sales}</Text>
                        <Text style={[textStyles.h6, { color: 'black', textAlign: 'center' }]}>Ventas</Text>
                    </View>
                </View>

                <View style={styles.qrSection}>
                    <QR qrData={qrData} />
                    {
                        amount > 0 && <Text style={styles.receivingAmount}>${amount}</Text>
                    }
                </View>

            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: theme.darkColors.almost_white,
        justifyContent: 'space-between',
    },
    statsContainer: {
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        backgroundColor: theme.darkColors.almost_white,
    },
    sharingContainer: {
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 50,
        justifyContent: 'space-between',
        backgroundColor: theme.darkColors.almost_white,
    },
    qrSection: {
        flex: 1,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme.darkColors.almost_white,
    },
    receivingAmount: {
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
        color: theme.darkColors.background,
    }
})