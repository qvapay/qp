
import React, { useContext, useEffect } from 'react';
import QR from '../ui/QR';
import { AppContext } from '../../AppContext';
import { View, StyleSheet } from 'react-native';
import ProfilePictureSection from '../ui/ProfilePictureSection';

export default function ProfileScreen({ amount = 0 }) {

    const { me } = useContext(AppContext);
    const { qrData = `qvapay://u:${me.username}:a:${amount}` } = me;

    // Set the max brightness on screen
    useEffect(() => {
        const setMaxBrightness = async () => {
            await Brightness.setBrightnessAsync(1);
        }
        setMaxBrightness();
    }, [])

    return (
        <View style={styles.container}>
            <ProfilePictureSection user={me} />
            <View style={styles.qrSection}>
                <QR qrData={qrData} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#161d31',
    },
    qrSection: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})