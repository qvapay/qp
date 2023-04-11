
import React, { useState, useEffect } from 'react';
import QR from '../ui/QR';
import { View, StyleSheet } from 'react-native';
import ProfilePictureSection from '../ui/ProfilePictureSection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ amount = 0 }) {

    const [user, setUser] = useState({});
    const { qrData = `qvapay://u:${user.username}:a:${amount}` } = user;

    // Get the user data from the AsyncStorage getItem('me') from useEffect
    useEffect(() => {
        const getUserData = async () => {
            const me = await AsyncStorage.getItem('me');
            console.log(me)
            setUser(JSON.parse(me));
        }
        getUserData();
    }, []);

    return (
        <View style={styles.container}>
            <ProfilePictureSection user={user} />
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