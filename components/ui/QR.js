import React from 'react'
import QRCodeStyled from 'react-native-qrcode-styled';
import { theme } from './Theme';

export default function QR({ qrData }) {

    return (
        <QRCodeStyled
            data={qrData}
            pieceSize={10}
            color={theme.darkColors.background}
            backgroundColor={theme.darkColors.almost_white}
            pieceCornerType={'rounded'}
            logoBackgroundColor={'transparent'}
            style={{ backgroundColor: theme.darkColors.almost_white }}
            pieceBorderRadius={5}
            isPiecesGlued={true}
            padding={20}
        />
    )
}