import React, { useEffect, useState } from 'react';
import { parseQRData, isValidQRData } from '../../utils/Helpers';
import { Pressable, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS } from 'react-native-permissions';

// Theme
import { theme } from '../ui/Theme';

// Todo: 
// Add a button to light up the bulb

export default function ScanScreen({ navigation }) {

    const [permissionResult, setPermissionResult] = useState(null);
    const [validQR, setValidQR] = useState('#fff');

    // Add the bulb icon to right side of the top bar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={styles.scanTopBar} onPress={() => { }}>
                    <FontAwesome5 name='lightbulb' size={20} style={styles.faIcon} />
                </Pressable>
            ),
        });
    }, [navigation]);

    // request permission with a useEffect
    useEffect(() => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {
                setPermissionResult(result)
            })
            .catch((error) => {
                navigation.replace('MainStack');
            })
    }, []);

    // Succefully read a QR code
    const onSuccess = e => {
        const parsedData = parseQRData(e.data);
        if (!isValidQRData(parsedData)) {
            return;
        }
        setValidQR('#28c76f');
        navigateToTransferScreenWithDelay(parsedData, 1000);
    };

    // Navigate to another screen with a delay and params
    const navigateToTransferScreenWithDelay = (params, delay) => {
        setTimeout(() => {
            navigation.navigate('ConfirmSendScreen', { amount: params.amount, destination: params.username });
        }, delay);
    };

    return (
        <View style={styles.container}>

            <View style={styles.rectangleContainer}>
                <View style={[styles.cameraContainer, { borderColor: validQR }]}>
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        cameraStyle={styles.camera}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.darkColors.background
    },
    scanTopBar: {
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        width: 280,
        height: 280,
        borderWidth: 4,
        borderRadius: 18,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    faIcon: {
        color: '#fff',
    }
});