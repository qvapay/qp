import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { AppContext } from '../../AppContext';
import { GiftedChat } from 'react-native-gifted-chat';
import { sendP2pMessage } from '../../utils/QvaPayClient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default function ChatSection({ uuid }) {

    const { me } = useContext(AppContext);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    // Get Messages from API using QvaPayClient and store in state
    // useEffect to get all sent messages

    // Send Message
    const onSend = useCallback(async (newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        setInput('');

        try {
            const response = await sendP2pMessage({ uuid: uuid, text: newMessages[0].text });
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }

    }, [messages]);

    const sendMessage = () => {
        if (input.trim().length > 0) {
            onSend([{
                _id: Math.random().toString(36).substring(7),
                text: input,
                createdAt: new Date(),
                user: {
                    _id: me.uuid,
                    name: me.name,
                    avatar: me.profile_photo_url
                },
            }]);
        }
    };

    return (
        <View style={styles.container}>

            <GiftedChat
                scrollToBottom
                messages={messages}
                user={{ _id: me.uuid, name: me.name, avatar: me.profile_photo_url }}
                renderInputToolbar={() => null}
                showAvatarForEveryMessage={true}
                placeholder="Escribe un mensaje..."
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    multiline={false}
                    style={styles.input}
                    placeholderTextColor={'gray'}
                    placeholder="Escribe un mensaje..."
                    onChangeText={text => setInput(text)}
                />

                <Pressable onPress={sendMessage} style={styles.messageSend}>
                    <FontAwesome5 name='paper-plane' size={16} color='white' />
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingTop: 20,
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.elevation,
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        paddingHorizontal: 8,
        fontFamily: 'Rubik-Regular',
    },
    messageSend: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: theme.darkColors.primary,
    }
})