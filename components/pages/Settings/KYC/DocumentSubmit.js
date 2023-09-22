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

export default function DocumentSubmit() {

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
        console.log(data.uri);

        try {
          if (data.uri) {
            setUploadingDocument(true);
            uploadKYCItem({ imageUri: data.uri, documentType: 'document' }).then((result) => {
              if (result && result.status === 201) {
                // Wait 3 seconds before go to SelfieSubmit
                setTimeout(() => {
                  setUploadingDocument(false);
                  navigation.navigate('KYCStack', { screen: 'SelfieSubmit' });
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
            <Text style={textStyles.h3}>Estamos enviando tu documento...</Text>
          </View>
        ) : (
          <>
            <Text style={textStyles.h1}>Escanea tu ID:</Text>
            <Text style={textStyles.h6}>Necesitamos un documento oficial con foto y datos de identidad personal para validar su usuario.</Text>

            <View style={{ flex: 1, marginTop: 20 }}>

              {
                permissionResult === 'granted' ? (
                  <View style={styles.cameraContainer}>
                    <RNCamera
                      ref={cameraRef}
                      style={{ height: '100%', width: '100%' }}
                      type={RNCamera.Constants.Type.back} captureAudio={false}
                    />
                    <View style={styles.maskOverlay}>
                      <View style={styles.maskCutout}>
                        <View style={styles.idPhotoBox}></View>
                        <View style={styles.idLine1}></View>
                        <View style={styles.idLine2}></View>
                        <View style={styles.idLine3}></View>
                      </View>
                    </View>
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
    width: width - 20,
    height: 260,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    borderColor: 'white',
  },
  maskOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  idLine1: {
    height: 2,
    width: width - 80,
    backgroundColor: '#FFFFFF60',
    marginVertical: 15,
  },
  idLine2: {
    height: 2,
    width: width - 80,
    backgroundColor: '#FFFFFF60',
    marginVertical: 15,
  },
  idLine3: {
    height: 2,
    width: width - 80,
    backgroundColor: '#FFFFFF60',
    marginVertical: 15,
  },
  loadingAnimation: {
    width: 300,
    height: 300,
  }
})