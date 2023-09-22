import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import LottieView from "lottie-react-native";
import QPTabButton from '../../../ui/QPTabButton';
import { AppContext } from '../../../../AppContext';
import { useNavigation } from '@react-navigation/native';
import { apiRequest } from '../../../../utils/QvaPayClient'
import { globalStyles, textStyles } from '../../../ui/Theme'

export default function KYCAsistantScreen({ route }) {

    const navigation = useNavigation();

    // import AppContext
    const { me } = useContext(AppContext);
    const [verified, setVerified] = useState(me.kyc);
    const [selfieImageStatus, setSelfieImageStatus] = useState(false);
    const [documentImageStatus, setDocumentImageStatus] = useState(false);
    const [documentOwnerStatus, setDocumentOwnerStatus] = useState(false);

    // useEffct for check the verification Status
    useEffect(() => {
        get_kyc_status();
        const interval = setInterval(() => {
            get_kyc_status();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const get_kyc_status = async () => {
        try {
            const url = `/user/kyc`
            const response = await apiRequest(url, { method: 'GET' }, navigation);

            // Check if isset "document" property and is not ""
            if (response.document_url && response.document_url !== "") {
                setDocumentImageStatus(true);
            }

            // Check if isset "selfie" property and is not ""
            if (response.selfie_url && response.selfie_url !== "") {
                setSelfieImageStatus(true);
            }

            // Check if isset "check" property and is not ""
            if (response.check_url && response.check_url !== "") {
                setDocumentOwnerStatus(true);
            }

            // Check if isset "result" property and is not ""
            if (response.result && response.result !== "") {
                if (response.result === "passed") {
                    setVerified(true);
                } else {
                    setVerified(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Check if this is already verified and if not, navigate to the verification screen
    const handleDocumentImagePress = () => {
        if (!documentImageStatus) {
            navigation.navigate('DocumentSubmit');
        }
    }

    // Check if this is already verified and if not, navigate to the verification screen
    const handleSelfieImagePress = () => {
        if (!selfieImageStatus) {
            navigation.navigate('SelfieSubmit');
        }
    }

    // Check if this is already verified and if not, navigate to the verification screen
    const handleDocumentOwnerPress = () => {
        if (!documentOwnerStatus) {
            navigation.navigate('CheckSubmit');
        }
    }

    return (
        <View style={globalStyles.container}>
            {
                verified ? (
                    <>
                        <LottieView source={require('../../../../assets/lotties/verified.json')} autoPlay loop={false} style={styles.verifiedLottie} />
                        <Text style={[textStyles.h1, { textAlign: 'center' }]}>¡Tu cuenta está verificada!</Text>
                    </>
                ) : (
                    <>
                        <Text style={textStyles.h1}>Verificar cuenta:</Text>
                        <Text style={textStyles.h6}>Con tu cuenta de QvaPay verificada, podrás acceder a mejoras y nuevas funcionalidades para crecer las posibilidades de tus finanzas.</Text>

                        <View style={styles.stepsContainer}>

                            <QPTabButton title="Documento ID" subtitle="Paso 1" active={documentImageStatus} logo={"id"} onPress={handleDocumentImagePress} />
                            <QPTabButton title="Foto & Video" subtitle="Paso 2" active={selfieImageStatus} logo={"faceid"} onPress={handleSelfieImagePress} />
                            <QPTabButton title="Confirmación" subtitle="Paso 3" active={documentOwnerStatus} logo={"security"} onPress={handleDocumentOwnerPress} />

                        </View>

                        {
                            // If all steps are completed, show a warning dialog to the user for working on it
                            documentImageStatus && selfieImageStatus && documentOwnerStatus ? (
                                <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
                                    <Text style={styles.whyTextStyle} >¡Ya casi terminas!</Text>
                                    <Text style={styles.whyTextStyle} >Estamos revisando los documentos enviados, le notificaremos en breve su estado de verificación.</Text>
                                </View>
                            ) : (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
                                    <Text style={styles.whyTextStyle} onPress={() => Linking.openURL('https://blog.qvapay.com')}>¿Por qué esto es necesario?</Text>
                                </View>
                            )
                        }

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