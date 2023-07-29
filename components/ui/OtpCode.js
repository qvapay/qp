import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native'

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
        // Move to the next input automatically
        if (value !== '') {
            const nextIndex = index + 1;
            if (inputs.current[nextIndex]) {
                inputs.current[nextIndex].focus();
            }
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
    const handleInputPaste = (event) => {
        const pastedCode = event.clipboardData.getData('text').slice(0, cols);
        setCode(pastedCode);
        for (let i = 0; i < cols; i++) {
            if (inputs.current[i] && i < pastedCode.length - 1) {
                inputs.current[i].focus();
            }
        }
    };

    // Call the parent component's setValidatedCode function
    const handleCodeValidation = () => {
        setValidatedCode(code);
    };

    return (
        <View style={styles.container}>
            {[...Array(cols)].map((_, index) => (
                <TextInput
                    key={index}
                    ref={(input) => (inputs.current[index] = input)}
                    style={[styles.input, { borderColor: code[index] ? '#6759EF' : 'white' }]}
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        width: 35,
        height: 56,
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        borderBottomWidth: 2,
        fontFamily: 'Rubik-Bold',
    },
})  