import React, { useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, Pressable, Alert, Animated } from 'react-native'
import { AppContext } from '../../../AppContext';
import { globalStyles, theme } from '../../ui/Theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function KeypadScreen({ navigation }) {

    const { me } = useContext(AppContext);
    const [amount, setAmount] = useState('0');
    const fontSize = useRef(new Animated.Value(60)).current;

    // KeyPad
    const keys = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', '<'],
    ];

    // KeyPad renderer
    const renderKey = (key, index) => (
        <Pressable key={index} onPress={() => keyPressed(key)} style={styles.pressable}>
            {key === '<' ? (
                <FontAwesome5 name="backspace" size={18} color="white" />
            ) : (
                <Text style={styles.padText}>{key}</Text>
            )}
        </Pressable>
    );

    // Detect every Pressabe keytouch
    const keyPressed = (key) => {

        // If the amount is 0 and no decimals, replace it with the new amount
        if (amount === '0' && key !== '.' && key !== '<') {
            setAmount(key);
            return;
        }

        // Add the amount to the state
        if (key === '<') {
            const newAmount = amount.slice(0, -1);
            let newFontSize = calculateFontSize(newAmount);
            animateFontSize(newFontSize);
            setAmount(newAmount);
            return;
        }

        // Only allow 1 . in the amount
        if (key === '.' && amount.includes('.')) {
            return;
        }

        // Only allow two decimals
        if (key !== '.' && amount.includes('.')) {
            const [int, dec] = amount.split('.');
            if (dec.length >= 2) {
                return;
            }
        }

        // Only allow 6 characters in the amount
        if (amount.length >= 6) {
            return;
        }

        // Animate font
        let newFontSize = calculateFontSize(amount + key);
        animateFontSize(newFontSize);

        // Set the amount if everithing passes
        setAmount(amount + key);
    }

    // Send Amount to SendScreen
    const sendAmount = () => {
        if (amount > 0) {
            if (amount > me.balance) {
                Alert.alert('Error', 'El monto no puede ser mayor a tu balance');
                return;
            }
            navigation.navigate('SendScreen', { amount });
        } else {
            Alert.alert('Error', 'El monto debe ser mayor a 0');
        }
    }

    // Receive Navigation 
    const receiveAmount = () => {
        navigation.navigate('ProfileScreen', { amount });
    }

    // Set the max balance to the amount wen pressed
    const setMaxBalance = () => {
        setAmount(me.balance.toString());
    }

    // Dinamically reduce the KeyPad font based on amount of characters
    const calculateFontSize = (amount) => {
        let baseSize = 60;
        let decreaseFactor = 4;
        let newSize = baseSize - ((amount.length - 1) * decreaseFactor);
        return newSize > 30 ? newSize : 30;
    }

    const animateFontSize = (newSize) => {
        Animated.timing(fontSize, {
            toValue: newSize,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={globalStyles.container}>

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.dolarSign}>$</Text>
                        <Animated.Text style={[styles.amount, { fontSize: fontSize }]}>{amount}</Animated.Text>
                    </View>
                    <Pressable onPress={setMaxBalance}>
                        <View style={styles.balance}>
                            <Text style={styles.balanceText}>$ {me.balance}</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.padContainer}>
                    {
                        keys.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.pad}>
                                {
                                    row.map((key, keyIndex) => renderKey(key, keyIndex))
                                }
                            </View>
                        ))
                    }
                </View>
            </View>

            <View style={styles.actionButtons}>
                <Pressable style={styles.actionButton1} onPress={receiveAmount} >
                    <FontAwesome5 name='arrow-down' size={16} color={theme.darkColors.elevation_light} style={{ marginRight: 5 }} />
                    <Text style={styles.actionButtonLabel}>Recibir</Text>
                </Pressable>
                <View style={{ width: 3 }}></View>
                <Pressable style={styles.actionButton2} onPress={sendAmount} >
                    <FontAwesome5 name='arrow-up' size={16} color={theme.darkColors.elevation_light} style={{ marginRight: 5 }} />
                    <Text style={styles.actionButtonLabel}>Enviar</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    padContainer: {
        marginTop: 30
    },
    amountContainer: {
        height: 80,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dolarSign: {
        fontSize: 30,
        marginRight: 5,
        alignSelf: 'center',
        fontFamily: "Rubik-ExtraBold",
        color: theme.darkColors.elevation_light,
    },
    amount: {
        fontSize: 60,
        color: 'white',
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
    },
    balance: {
        borderRadius: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: theme.darkColors.elevation,
    },
    balanceText: {
        color: 'white',
        fontSize: 13,
        alignSelf: 'center',
        fontFamily: "Rubik-Bold",
    },
    pad: {
        marginVertical: 15,
        flexDirection: 'row',
    },
    padText: {
        fontSize: 35,
        color: 'white',
        fontFamily: "Rubik-Regular",
    },
    actionButtons: {
        paddingBottom: 20,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: theme.darkColors.background,
    },
    actionButton1: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    actionButton2: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    actionButtonLabel: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: "Rubik-Bold",
    }
})