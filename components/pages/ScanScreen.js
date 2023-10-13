import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { globalStyles, theme } from '../ui/Theme';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS } from 'react-native-permissions';
import { parseQRData, isValidQRData } from '../../utils/Helpers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

// get height and width of the screen
const { height, width } = Dimensions.get('window');

export default function ScanScreen() {

    const navigation = useNavigation();
    const [validQR, setValidQR] = useState(theme.darkColors.almost_white);
    const [torchOn, setTorchOn] = useState(false);
    const [permissionResult, setPermissionResult] = useState(null);

    // Add the bulb icon to right side of the top bar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => { setTorchOn(!torchOn) }}>
                    <FontAwesome5 name='lightbulb' size={20} style={{ color: torchOn ? theme.darkColors.success : theme.darkColors.almost_white }} />
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
        console.log(parsedData)
        if (!isValidQRData(parsedData)) {
            return;
        }
        setValidQR(theme.darkColors.success);
        navigateToTransferScreenWithDelay(parsedData, 500);
    };

    // Navigate to another screen with a delay and params
    const navigateToTransferScreenWithDelay = (params, delay) => {
        setTimeout(() => {
            // TODO if there is params.qp === true, navigate to ConfirmSendScreen, if not, navigate to WithdrawScreen
            navigation.navigate('ConfirmSendScreen', { amount: params.amount, destination: params.username });
        }, delay);
    };

    return (
        <View style={globalStyles.container}>
            <View style={[styles.cameraContainer, { borderColor: validQR }]}>
                <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    cameraStyle={styles.camera}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        width: width - 40,
        height: height / 2,
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    camera: {
        height: '100%',
        width: '100%',
    }
});