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

export default function SelfieSubmit() {

    const cameraRef = useRef(null);
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
                console.log(data.uri);

                try {
                    if (data.uri) {
                        setUploadingDocument(true);
                        uploadKYCItem({ imageUri: data.uri, documentType: 'selfie' }).then((result) => {
                            if (result && result.status === 201) {
                                // Wait 3 seconds before go to CheckSubmit
                                setTimeout(() => {
                                    setUploadingDocument(false);
                                    navigation.navigate('KYCStack', { screen: 'CheckSubmit' });
                                }, 3000);
                            } else {
                                console.log('Error al enviar la selfie');
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
                        <Text style={textStyles.h3}>Estamos enviando tu selfie...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={textStyles.h1}>Hazte una Selfie:</Text>
                        <Text style={textStyles.h6}>Necesitamos verificar que su cara corresponde al documento de identidad proporcionado.</Text>

                        <View style={{ flex: 1, marginTop: 20 }}>

                            {
                                permissionResult === 'granted' ? (
                                    <View style={styles.cameraContainer}>
                                        <RNCamera
                                            ref={cameraRef}
                                            style={{ height: '100%', width: '100%' }}
                                            type={RNCamera.Constants.Type.front}
                                            captureAudio={false}
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
        width: width - 100,
        height: 400,
        borderWidth: 2,
        borderRadius: 200,
        overflow: 'hidden',
        borderColor: 'white',
        alignSelf: 'center',
    },
    maskOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo semi-transparente
    },
    maskCutout: {
        margin: 10,
        height: 240,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'flex-start',
        borderColor: '#FFFFFF60',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    idPhotoBox: {
        width: 100,
        height: 100,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 10,
        borderColor: '#FFFFFF60',
        backgroundColor: '#FFFFFF20',
        marginBottom: 10,
    },
    loadingAnimation: {
        width: 300,
        height: 300,
    }
})