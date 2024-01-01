import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import QPInput from './QPInput';

export default function OtpCode({ cols = 6, setValidatedCode }) {

    // Completed Code
    const inputs = useRef([]);
    const [code, setCode] = useState('');

    // Focus the first input when the component mounts
    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        if (code.length === cols) {
            handleCodeValidation();
        }
    }, [code]);

    // Handle the Input
    const handleInputChange = (index, value) => {
        const newCode = code.slice(0, index) + value + code.slice(index + 1);
        setCode(newCode);
        // Move to the next input automatically if the current input is not empty and the next input exists
        if (value !== '' && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
    };

    // Focus on the previous input when Backspace is pressed and current input is empty
    const handleInputKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace' && (code[index] === '' || code[index] === undefined)) {
            const prevIndex = index - 1;
            if (inputs.current[prevIndex]) {
                inputs.current[prevIndex].focus();
            }
        }
    };

    // Handle the paste event
    const handleInputPaste = async (event) => {
        const clipboardContent = await Clipboard.getString();
        const pastedCode = clipboardContent.slice(0, cols);
        setCode(pastedCode);
        if (inputs.current[pastedCode.length - 1]) {
            inputs.current[pastedCode.length - 1].focus();
        }
    };

    // Call the parent component's setValidatedCode function
    const handleCodeValidation = () => {
        setValidatedCode(code);
    };

    return (
        <View style={styles.container}>
            {[...Array(cols)].map((_, index) => (
                <QPInput
                    key={index}
                    ref={(input) => (inputs.current[index] = input)}
                    style={{ width: 55, fontSize: 22, textAlign: 'center', fontFamily: 'Rubik-Medium' }}
                    onChangeText={(value) => handleInputChange(index, value)}
                    onKeyPress={(event) => handleInputKeyPress(event, index)}
                    value={code[index] || ''}
                    maxLength={1}
                    keyboardType="number-pad"
                    onPaste={handleInputPaste}
                    onSubmitEditing={handleCodeValidation}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
})  