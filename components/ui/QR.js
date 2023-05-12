import React from 'react'
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function QR({ qrData }) {

    return (
        <QRCodeStyled
            data={qrData}
            pieceSize={10}
            color={'#161d31'}
            backgroundColor={'white'}
            pieceCornerType={'rounded'}
            logoBackgroundColor={'transparent'}
            style={{ backgroundColor: 'white' }}
            pieceBorderRadius={5}
            isPiecesGlued={true}
            padding={20}
        />
    )
}

const styles = StyleSheet.create({
    qrContainer: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white'
    }
});