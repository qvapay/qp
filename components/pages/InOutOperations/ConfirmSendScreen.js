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
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../ui/Theme';

Sound.setCategory('Playback');
const ding = new Sound('paid.mp3', Sound.MAIN_BUNDLE);

export default function ConfirmSendScreen({ route }) {

    const navigation = useNavigation();
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

        if (!to || !amount || !comment) {
            return;
        }

        setSendingPayment(true);

        // Now send balance via transferBalance method and check response
        const response = await transferBalance({ to, amount, comment, navigation });

        // Make a sound and change to payment completed animation
        if (response && response.status && response.status === "paid" && response.uuid) {
            playDone();
            setPaymentCompleted(true);
        } else {
            setSendingPayment(false);
            navigation.navigate('KeypadScreen');
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} >
            {paymentCompleted ? (
                <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate('HomeScreen')}>
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
        paddingHorizontal: 10,
        alignContent: 'center',
        backgroundColor: theme.darkColors.background,
    },
    destinationAvatar: {
        flex: 1,
    },
    sendingLabel: {
        fontSize: 13,
        color: 'white',
        alignSelf: 'center',
        fontFamily: "Rubik-Regular",
    },
    destinationComment: {
        flex: 1,
        justifyContent: 'center',
    },
})