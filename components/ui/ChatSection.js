import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChatSection() {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const sendMessage = () => {
        if (inputText.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: Date.now(), text: inputText, sender: 'Usuario1' },
            ]);
            setInputText('');

            // Simula la respuesta del otro usuario
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { id: Date.now(), text: 'Respuesta del Usuario2', sender: 'Usuario2' },
                ]);
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer(item.sender === 'Usuario1')}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                onContentSizeChange={() =>
                    messages.length > 0 && flatListRef.current.scrollToEnd({ animated: true })
                }
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor="gray"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <FontAwesome5 name="paper-plane" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: '#283046',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    messageContainer: isUser1 => ({
        alignSelf: isUser1 ? 'flex-end' : 'flex-start',
        backgroundColor: isUser1 ? '#7367f0' : '#f0f0f0',
        maxWidth: '75%',
        borderRadius: 5,
        marginBottom: 8,
        paddingVertical: 8,
        marginHorizontal: 8,
        paddingHorizontal: 12,
    }),
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        minHeight: 40,
        color: 'white',
        paddingHorizontal: 10,
        fontFamily: 'Nunito-Regular',
    },
    sendButton: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#7367f0',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
})