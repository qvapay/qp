
import React, { useContext, useEffect, useState } from 'react';
import QR from '../ui/QR';
import { AppContext } from '../../AppContext';
import { View, StyleSheet, Text } from 'react-native';
import ProfilePictureSection from '../ui/ProfilePictureSection';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

export default function ProfileScreen({ amount = 0 }) {

    const { me } = useContext(AppContext);
    const { qrData = `qp://u:${me.username}:a:${amount}` } = me;
    const [initialBrightness, setInitialBrightness] = useState(null);

    // Set the max brightness on screen
    useEffect(() => {
        // Guardar el brillo actual para poder restaurarlo luego
        DeviceBrightness.getBrightnessLevel().then((brightness) => {
            setInitialBrightness(brightness);
            DeviceBrightness.setBrightnessLevel(1);
        });

        // Limpiar la función de efecto para que se ejecute solo una vez
        return () => {
            if (initialBrightness !== null) {
                DeviceBrightness.setBrightnessLevel(initialBrightness);
            }
        };
    }, [initialBrightness]);

    return (
        <View style={styles.container}>

            <ProfilePictureSection user={me} negative={true} />



            <View style={styles.qrSection}>
                {
                    amount > 0 && (
                        <Text style={styles.receivingAmount}>Recibir: ${amount}</Text>
                    )
                }
                <QR qrData={qrData} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    qrSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    receivingAmount: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
    }
})