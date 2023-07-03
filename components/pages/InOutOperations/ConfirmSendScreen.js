import React, { useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Pressable } from 'react-native'
import Sound from 'react-native-sound';
import QPButton from '../../ui/QPButton';
import SendingPayment from './SendingPayment';
import CompletedPayment from './CompletedPayment';
import CommentSticker from '../../ui/CommentSticker';
import ProfilePictureSection from '../../ui/ProfilePictureSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transferBalance, checkUser } from '../../../utils/QvaPayClient';

Sound.setCategory('Playback');
const ding = new Sound('paid.mp3', Sound.MAIN_BUNDLE);

export default function ConfirmSendScreen({ route, navigation }) {

    const [user, setUser] = useState({});
    const { destination = '' } = route.params;
    const [to] = useState(destination);
    const [amount] = useState(route.params.amount);
    const [comment, setComment] = useState('');
    const [sendingPayment, setSendingPayment] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    useEffect(() => {
        navigation.setOptions({ title: `Enviando ${amount}` });
    }, []);

    useEffect(() => {
        ding.setVolume(1);
        return () => {
            ding.release();
        };
    }, []);

    // Check for paymentCompleted with useEffect and hide topBar
    useEffect(() => {
        if (paymentCompleted) {
            navigation.setOptions({
                headerShown: false,
            });
        }
    }, [paymentCompleted]);

    const playDone = () => {
        ding.play();
    };

    // useEffect to get the destination data and check against checkUser from QvaPayClient
    useEffect(() => {
        const fetchUser = async () => {

            const response = await checkUser({ to, navigation });
            setUser(response.user);

            // Sve this user to the contact list in AsyncStorage or update it by its uuid
            const contacts = await AsyncStorage.getItem('contacts');

            // toSave User schema
            const userToSave = {
                uuid: response.user.uuid,
                name: response.user.name,
                username: response.user.username,
                source_uri: response.user.profile_photo_url,
            };

            if (contacts) {
                const contactsArray = JSON.parse(contacts);
                const contactIndex = contactsArray.findIndex((contact) => contact.uuid === response.user.uuid);
                if (contactIndex === -1) {
                    contactsArray.push(userToSave);
                } else {
                    contactsArray[contactIndex] = userToSave
                }
                await AsyncStorage.setItem('contacts', JSON.stringify(contactsArray));
            } else {
                await AsyncStorage.setItem('contacts', JSON.stringify([userToSave]));
            }
        };
        fetchUser();
    }, []);

    // Confirm Send Money
    const handleConfirmSendMoney = async () => {

        // Validate data
        if (!to || !amount || !comment) {
            return;
        }

        // Set setSendingPayment to true
        setSendingPayment(true);

        // Now send balance via transferBalance method and check response
        const response = await transferBalance(to, amount, comment);

        // If data status = paid and there is an uuid
        // Make a sound and change to payment completed animation
        if (response.status === 201 && response.data.uuid) {
            playDone();
            setPaymentCompleted(true);
        } else {

            // If response.status is 422 theres no enough balance
            if (response.status === 422) {
                alert('No tienes saldo suficiente');
            }

            // If response.status is 404 theres no user with that email
            if (response.status === 404) {
                alert('No se encontró el usuario');
            }

            // If response.status is 400 theres no user with that email
            if (response.status === 400) {
                alert('No se encontró el usuario');
            }

            // Go to KeyPad Screen
            navigation.navigate('KeypadScreen');
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} >
            {paymentCompleted ? (
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                        navigation.navigate('HomeScreen');
                    }}>
                    <CompletedPayment />
                </Pressable>
            ) : (
                <>
                    {sendingPayment ? (<SendingPayment />) : (
                        <>
                            <View style={{ flex: 1 }}>

                                <View style={styles.destinationAvatar}>
                                    <ProfilePictureSection user={user} />
                                </View>

                                <View style={styles.destinationComment}>
                                    <CommentSticker setComment={setComment} />
                                </View>

                            </View>

                            <QPButton title={`ENVIAR \$${amount}`} onPress={handleConfirmSendMoney} />
                        </>
                    )}
                </>
            )}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignContent: 'center',
        backgroundColor: '#161d31',
    },
    destinationAvatar: {
        flex: 1,
    },
    sendingLabel: {
        fontSize: 13,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Nunito-Regular",
    },
    destinationComment: {
        flex: 1,
        justifyContent: 'center',
    },
})