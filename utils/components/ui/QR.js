import React from 'react'
import { View, StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function QR({ qrData }) {

    console.log("qrData: " + qrData)

    return (
        <View style={styles.qrContainer}>
            <QRCodeStyled
                pieceSize={10}
                color={'#161d31'}
                logoBorderRadius={10}
                backgroundColor={'white'}
                style={styles.qrCodeStyled}
                logoBackgroundColor={'transparent'}
                data={qrData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    qrContainer: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white'
    }
});