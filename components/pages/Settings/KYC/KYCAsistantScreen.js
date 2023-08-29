import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles, textStyles } from '../../../ui/Theme'
import QPButton from '../../../ui/QPButton';
import QPTabButton from '../../../ui/QPTabButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import { AppContext } from '../../../../AppContext';

export default function KYCAsistantScreen() {

    const navigation = useNavigation();

    // import AppContext
    const { me } = useContext(AppContext);
    const [verified, setVerified] = useState(me.kyc);

    const [documentImage, setDocumentImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [documentOwner, setDocumentOwner] = useState(null);

    const [documentImageStatus, setDocumentImageStatus] = useState(false);
    const [selfieImageStatus, setSelfieImageStatus] = useState(false);
    const [documentOwnerStatus, setDocumentOwnerStatus] = useState(false);

    // Handle press for each tab
    const handleDocumentImagePress = () => {
        // Check if this is already verified and if not, navigate to the verification screen
        if (!documentImageStatus) {
            // Navigate to the verification screen
            navigation.navigate('DocumentSubmit');
        }
    }

    const handleSelfieImagePress = () => {
        // Check if this is already verified and if not, navigate to the verification screen
        if (!selfieImageStatus) {
            // Navigate to the verification screen
            navigation.navigate('SelfieSubmit');
        }
    }

    const handleDocumentOwnerPress = () => {
        // Check if this is already verified and if not, navigate to the verification screen
        if (!documentOwnerStatus) {
            // Navigate to the verification screen
            navigation.navigate('OwnerSubmit');
        }
    }

    return (
        <View style={globalStyles.container}>
            {
                verified ? (
                    <>
                        <LottieView source={require('../../../../assets/lotties/verified.json')} autoPlay style={styles.verifiedLottie} />
                        <Text style={[textStyles.h1, { textAlign: 'center' }]}>¡Tu cuenta está verificada!</Text>
                    </>
                ) : (
                    <>
                        <Text style={textStyles.h1}>Verificar cuenta:</Text>
                        <Text style={textStyles.h6}>Con tu cuenta de QvaPay verificada, podrás acceder a mejoras y nuevas funcionalidades para crecer las posibilidades de tus financzas.</Text>

                        <View style={styles.stepsContainer}>

                            <QPTabButton title="Documento ID" subtitle="Paso 1" active={documentImageStatus} logo={"id"} onPress={handleDocumentImagePress} />
                            <QPTabButton title="Foto & Video" subtitle="Paso 2" active={selfieImageStatus} logo={"faceid"} onPress={handleSelfieImagePress} />
                            <QPTabButton title="Confirmación" subtitle="Paso 3" active={documentOwnerStatus} logo={"security"} onPress={handleDocumentOwnerPress} />

                        </View>

                        <QPButton title="Siguiente" onPress={() => { }} disabled={true} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.whyTextStyle} onPress={() => { }}>¿Por qué esto es necesario?</Text>
                        </View>
                    </>
                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    stepsContainer: {
        flex: 1,
        paddingVertical: 10,
    },
    whyTextStyle: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
    },
    verifiedLottie: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
})