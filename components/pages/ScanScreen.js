import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native'

import { RNCamera } from 'react-native-camera';
import { globalStyles, theme } from '../ui/Theme';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS } from 'react-native-permissions';
import { parseQRData, isValidQRData } from '../../utils/Helpers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

// TODO Add a button to light up the bulb

export default function ScanScreen() {

    const navigation = useNavigation();
    const [validQR, setValidQR] = useState('white');
    const [torchOn, setTorchOn] = useState(false);
    const [permissionResult, setPermissionResult] = useState(null);

    // Add the bulb icon to right side of the top bar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => { setTorchOn(!torchOn) }}>
                    <FontAwesome5 name='lightbulb' size={20} style={{ color: torchOn ? theme.darkColors.success : 'white' }} />
                </Pressable>
            ),
        });
    }, [navigation, torchOn]);

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
        setValidQR(theme.darkColors.success);
        navigateToTransferScreenWithDelay(parsedData, 1000);
    };

    // Navigate to another screen with a delay and params
    const navigateToTransferScreenWithDelay = (params, delay) => {
        setTimeout(() => {
            navigation.navigate('ConfirmSendScreen', { amount: params.amount, destination: params.username });
        }, delay);
    };

    return (
        <View style={globalStyles.container}>
            <View style={styles.rectangleContainer}>
                <View style={[styles.cameraContainer, { borderColor: validQR }]}>
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                        cameraStyle={styles.camera}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        width: 280,
        height: 280,
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    camera: {
        height: '100%',
        width: '100%',
    }
});