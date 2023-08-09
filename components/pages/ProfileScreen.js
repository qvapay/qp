import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Share } from 'react-native';
import QR from '../ui/QR';
import { textStyles, theme } from '../ui/Theme';
import { AppContext } from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import ProfilePictureSection from '../ui/ProfilePictureSection';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

export default function ProfileScreen({ route }) {

    const { me, setBackgroundColor } = useContext(AppContext);
    const amount = route.params?.amount || 0;
    const { qrData = `qp://u:${me.username}:a:${amount}` } = me;
    const [initialBrightness, setInitialBrightness] = useState(null);
    const navigation = useNavigation();

    // Set the max brightness on screen
    useEffect(() => {
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

    const onShare = async () => {
        try {
            const result = await Share.share({
                // url: `https://qvapay.com/payme/username${me.username}`,
                title: `Ya puedes pagarme directo en QvaPay 💜\n\nhttps://qvapay.com/payme/${me.username}`,
                message: `Ya puedes pagarme directo en QvaPay 💜\n\nhttps://qvapay.com/payme/${me.username}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <>
            <Pressable style={styles.container} onPress={() => navigation.goBack()}>
                <ProfilePictureSection user={me} negative={true} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { color: 'black', textAlign: 'center', marginVertical: 0 }]}>0</Text>
                        <Text style={[textStyles.h6, { color: 'black', textAlign: 'center' }]}>P2P</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { color: 'black', textAlign: 'center', marginVertical: 0 }]}>1000</Text>
                        <Text style={[textStyles.h6, { color: 'black', textAlign: 'center' }]}>Ranking</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[textStyles.h1, { color: 'black', textAlign: 'center', marginVertical: 0 }]}>0</Text>
                        <Text style={[textStyles.h6, { color: 'black', textAlign: 'center' }]}>Ventas</Text>
                    </View>
                </View>

                <View style={styles.qrSection}>
                    <QR qrData={qrData} />
                    {amount > 0 && <Text style={styles.receivingAmount}>${amount}</Text>}
                </View>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', }}>
                <FontAwesome5 name="share" size={30} color={theme.darkColors.background} onPress={onShare} />
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
        flex: 1,
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