import React, { useState, useCallback, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../../../AppContext'
import { GiftedChat } from 'react-native-gifted-chat'
import { sendP2PChat, getP2PChat } from '../../../utils/QvaPayClient'

export default function P2PChat({ route }) {

    const { uuid } = route.params
    const { me } = useContext(AppContext)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    // Get Messages from API using QvaPayClient and store in state
    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getP2PChat({ uuid: uuid })
                console.log(response.data)
                const chats = response.data.map(chat => {
                    return {
                        _id: chat.id,
                        text: chat.message,
                        createdAt: new Date(chat.created_at),
                        user: {
                            _id: chat.user.uuid,
                            name: chat.user.name,
                            avatar: chat.user.profile_photo_url
                        },
                    }
                })
                setMessages(chats);
            } catch (error) {
                console.error('Error al obtener los mensajes:', error)
            }
        }
        getMessages()
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: "d19b1191-4d86-4054-873e-5ff7686d2c48",
                name: "Erich",
                avatar: "https://qva-pay.s3.amazonaws.com/avatars/1/1-1619118109.jpg"
            }}
        />
    )
}

const styles = StyleSheet.create({})