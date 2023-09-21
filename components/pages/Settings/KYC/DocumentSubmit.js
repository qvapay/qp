import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { request, PERMISSIONS } from 'react-native-permissions'
import { AppContext } from '../../../../AppContext'
import { globalStyles, textStyles } from '../../../ui/Theme'
import { useNavigation } from '@react-navigation/native'
import QPButton from '../../../ui/QPButton'

const { width } = Dimensions.get('window')

export default function DocumentSubmit() {

  const navigation = useNavigation()
  const [permissionResult, setPermissionResult] = useState(null)

  // request permission with a useEffect
  useEffect(() => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
      .then((result) => {
        setPermissionResult(result)
      })
      .catch((error) => {
        console.log("No se ha autorizado la camara")
      })
  }, []);

  // handle the Scan button
  const handleScan = () => {
    // Try to send the image to the server API
    // Awaits for the response
    // If the response is OK, then navigate to the next screen
    // If the response is not OK, then show an error message
  }

  return (
    <View style={globalStyles.container}>
      <Text style={textStyles.h1}>Escanea tu ID:</Text>
      <Text style={textStyles.h6}>Necesitamos un documento oficial con foto y datos de identidad personal para validar su usuario.</Text>

      <View style={{ flex: 1, marginTop: 20 }}>

        {
          permissionResult === 'granted' ? (
            <View style={styles.cameraContainer}>
              <RNCamera style={{ height: '100%', width: '100%' }} type={RNCamera.Constants.Type.back} captureAudio={false} />

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
})