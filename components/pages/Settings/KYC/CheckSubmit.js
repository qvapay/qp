import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native'
import QPButton from '../../../ui/QPButton'
import { RNCamera } from 'react-native-camera'
import { useNavigation } from '@react-navigation/native'
import { globalStyles, textStyles } from '../../../ui/Theme'
import { request, PERMISSIONS } from 'react-native-permissions'
import { uploadKYCItem } from '../../../../utils/QvaPayClient'
import LottieView from "lottie-react-native";

const { width } = Dimensions.get('window')

export default function CheckSubmit() {

    const cameraRef = useRef(null)
    const navigation = useNavigation()
    const [img, setImg] = useState(null)
    const [takingPic, setTakingPic] = useState(false)
    const [permissionResult, setPermissionResult] = useState(null)
    const [uploadingDocument, setUploadingDocument] = useState(false)

    // request permission with a useEffect
    useEffect(() => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {
                setPermissionResult(result)
            })
            .catch((error) => {
                console.log("No se ha autorizado la camara" + error)
            })
    }, []);

    // handle the Scan button
    const handleScan = async () => {
        if (cameraRef && permissionResult === 'granted' && !takingPic) {
            try {
                setTakingPic(true);
                const options = { quality: 0.8, exif: true, writeExif: true };
                const data = await cameraRef.current.takePictureAsync(options);
                setImg(data.uri);

                try {
                    if (data.uri) {
                        setUploadingDocument(true);
                        uploadKYCItem({ imageUri: data.uri, documentType: 'check' }).then((result) => {
                            if (result && result.status === 201) {
                                // Wait 3 seconds before go to KYCAsistantScreen
                                setTimeout(() => {
                                    setUploadingDocument(false);
                                    navigation.navigate('KYCStack', { screen: 'KYCAsistantScreen' });
                                }, 3000);
                            } else {
                                console.log('Error al actualizar la foto del documento');
                            }
                        }).catch((error) => {
                            console.error(`Error in Update: ${error}`);
                        })
                    }

                } catch (error) {
                    Alert.alert('Error', 'Sending: ' + (error.message || error));
                }

            } catch (error) {
                Alert.alert('Error', 'Failed to take picture: ' + (error.message || error));
                return;
            } finally {
                setTakingPic(false);
            }

        } else {
            console.log("No se ha autorizado la camara")
        }
    }

    return (
        <View style={globalStyles.container}>

            {
                uploadingDocument ? (
                    <View style={{ alignItems: 'center' }}>
                        <LottieView source={require('../../../../assets/lotties/uploading.json')} autoPlay loop style={styles.loadingAnimation} />
                        <Text style={textStyles.h3}>Estamos enviando tu foto...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={textStyles.h1}>¿Eres tú?</Text>
                        <Text style={textStyles.h6}>Ahora solo debes enviar una foto tuya sosteniendo el documento seleccionado.</Text>

                        <View style={{ flex: 1, marginTop: 20 }}>

                            {
                                permissionResult === 'granted' ? (
                                    <View style={styles.cameraContainer}>
                                        <RNCamera
                                            ref={cameraRef}
                                            style={{ height: '100%', width: '100%' }}
                                            type={RNCamera.Constants.Type.back} captureAudio={false}
                                        />
                                    </View>
                                ) : (
                                    <Text style={textStyles.h2}>Permiso de cámara no otorgado</Text>
                                )
                            }

                        </View>

                        <QPButton title="Escanear" onPress={handleScan} />
                    </>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        width: width - 30,
        height: '100%',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        borderColor: 'white',
    },
    loadingAnimation: {
        width: 300,
        height: 300,
    }
})