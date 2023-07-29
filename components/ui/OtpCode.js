import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native'

export default function OtpCode({ cols = 6, setValidatedCode }) {

    // Completed Code
    const inputs = useRef([]);
    const [code, setCode] = useState('');

    console.log(code)

    useEffect(() => {
        // Focus the first input when the component mounts
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);

    // Handle the Input
    const handleInputChange = (index, value) => {
        // Update the code state
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

    // Handle the paste event
    const handleInputPaste = (event) => {
        const pastedCode = event.clipboardData.getData('text').slice(0, cols);
        setCode(pastedCode);
        // Focus on the next input if there is any
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
                    style={[styles.input, { borderColor: 'white' }]}
                    onChangeText={(value) => handleInputChange(index, value)}
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
        justifyContent: 'space-evenly',      // space-between
    },
    input: {
        width: 35,
        height: 50,
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        borderBottomWidth: 2,
    },
})  