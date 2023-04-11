import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Switch, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ScanScreen() {

    // is QR enabled or disabled
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // Get navigation hook
    const navigation = useNavigation();
    const goHome = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <View style={styles.scanTopBar}>
                {/* Both icons, the camera and the back button, are from the react-native-vector-icons package. */}
                <Pressable onPress={goHome} >
                    <FontAwesome5 name="arrow-left" size={24} style={styles.faIcon} />
                </Pressable>

                <FontAwesome5 name="lightbulb" size={24} style={styles.faIcon} />
            </View>
            <View style={styles.rectangleContainer}>

                <View style={styles.rectangle}>

                </View>

                <View style={{ marginTop: 20 }}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#161d31'
    },
    scanTopBar: {
        padding: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        width: 300,
        height: 300,
        opacity: 0.5,
        borderWidth: 20,
        borderRadius: 40,
        borderColor: '#00FF00',
        backgroundColor: '#fff',
    },
    faIcon: {
        color: '#fff',
    }
});