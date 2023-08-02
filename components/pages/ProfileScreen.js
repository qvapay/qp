import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { AppContext } from '../../AppContext';
import ProfilePictureSection from '../ui/ProfilePictureSection';
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import { theme } from '../ui/Theme';
import QR from '../ui/QR';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ProfileScreen({ route }) {

    const { me, setBackgroundColor } = useContext(AppContext);
    const amount = route.params?.amount || 0;
    const { qrData = `qp://u:${me.username}:a:${amount}` } = me;
    const [initialBrightness, setInitialBrightness] = useState(null);
    const navigation = useNavigation();

    // Set the max brightness on screen
    useEffect(() => {

        // setBackgroundColor to white
        setTimeout(() => {
            setBackgroundColor('white');
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

    return (
        <>
            <Pressable style={styles.container} onPress={() => navigation.goBack()}>

                <ProfilePictureSection user={me} negative={true} />
                <Text style={{ textAlign: 'center' }}>{me.bio}</Text>

                <View style={styles.qrSection}>
                    <QR qrData={qrData} />
                    {amount > 0 && <Text style={styles.receivingAmount}>${amount}</Text>}
                </View>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', }}>
                <FontAwesome5 name="share" size={30} color={theme.darkColors.background} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    qrSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    receivingAmount: {
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
        color: theme.darkColors.background,
    }
})