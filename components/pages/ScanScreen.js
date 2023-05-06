import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Camera and permissions
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function ScanScreen() {

    const navigation = useNavigation();
    const goHome = () => navigation.goBack();
    const [permissionResult, setPermissionResult] = useState(null);
    const [validQR, setValidQR] = useState('#fff');

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

    const onSuccess = e => {
        console.log(e.data);
    };

    return (
        <View style={styles.container}>

            <View style={styles.scanTopBar}>
                <Pressable onPress={goHome} >
                    <FontAwesome5 name="arrow-left" size={20} style={styles.faIcon} />
                </Pressable>
                <FontAwesome5 name="lightbulb" size={20} style={styles.faIcon} />
            </View>

            <View style={styles.rectangleContainer}>
                <View style={styles.cameraContainer}>
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
    },
    cameraContainer: {
        height: 280,
        width: 280,
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#fff',
        overflow: 'hidden',
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    faIcon: {
        color: '#fff',
    }
});