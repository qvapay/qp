import React, { useState } from 'react';
// import { RNCamera } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ScanScreen() {

    // Get navigation hook
    const navigation = useNavigation();
    const goHome = () => navigation.goBack();

    const onSuccess = e => {
        console.log(e.data);
        // Puedes navegar a otra pantalla con los datos del QR o realizar alguna acción
    };

    return (
        <View style={styles.container}>
            <View style={styles.scanTopBar}>
                <Pressable onPress={goHome} >
                    <FontAwesome5 name="arrow-left" size={24} style={styles.faIcon} />
                </Pressable>
                <FontAwesome5 name="lightbulb" size={24} style={styles.faIcon} />
            </View>

            <View style={styles.rectangleContainer}>

                <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    cameraStyle={styles.rectangle}
                    showMarker
                    markerStyle={styles.rectangle}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#161d31'
    },
    scanTopBar: {
        padding: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        width: 300,
        height: 300,
        opacity: 0.5,
        borderWidth: 8,
        borderRadius: 40,
        backgroundColor: '#fff',
    },
    faIcon: {
        color: '#fff',
    }
});