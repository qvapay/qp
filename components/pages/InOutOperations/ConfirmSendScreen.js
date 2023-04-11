import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import Sound from 'react-native-sound';
import QPButton from '../../ui/QPButton';
import SendingPayment from './SendingPayment';
import CompletedPayment from './CompletedPayment';
import CommentSticker from '../../ui/CommentSticker';
import ProfilePictureSection from '../../ui/ProfilePictureSection';
import { transferBalance, checkUser } from '../../../utils/QvaPayClient';

Sound.setCategory('Playback');
const ding = new Sound('paid.mp3', Sound.MAIN_BUNDLE);

export default function ConfirmSendScreen({ route, navigation }) {

    const [user, setUser] = useState({});
    const { destination = '' } = route.params;
    const [to, setTo] = useState(destination);
    const [amount, setAmount] = useState(route.params.amount);
    const [comment, setComment] = useState('');
    const [sendingPayment, setSendingPayment] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

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
        ding.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    };

    // useEffect to get the destination data and check against checkUser from QvaPayClient
    useEffect(() => {
        const fetchUser = async () => {
            const response = await checkUser({ to, navigation });
            setUser(response.user);
        };
        fetchUser();
    }, []);

    // Confirm Send Money
    const handleConfirmSendMoney = async () => {

        // Validate data
        if (!to || !amount || !comment) {
            console.log('Missing required data');
            return;
        }

        // Set setSendingPayment to true
        setSendingPayment(true);

        // Now send balance via transferBalance method and check response
        const response = await transferBalance(to, amount, comment);

        // If data status = paid and there is an uuid
        // Make a sound and change to payment completed animation
        if (response.status === 201 && response.data.uuid) {
            // Play the confirmation Sound
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
        <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={100}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {paymentCompleted ? (
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                        console.log("Completed onPress")
                        navigation.navigate('HomeScreen');
                    }}>
                    <CompletedPayment />
                </Pressable>
            ) : (
                <>
                    {sendingPayment ? (<SendingPayment />) : (
                        <>
                            <View style={styles.destinationAvatar}>
                                <ProfilePictureSection user={user} />
                            </View>

                            <View style={styles.destinationAmount}>
                                <Text style={styles.sendingLabel}>Enviando ...</Text>
                                <Text style={styles.amount}>$ {amount}</Text>
                            </View>

                            <View style={styles.destinationComment}>
                                <CommentSticker setComment={setComment} />
                            </View>

                            <View style={styles.confirmTransaction}>
                                <QPButton
                                    title={`ENVIAR \$${amount}`}
                                    onPress={handleConfirmSendMoney}
                                />
                            </View>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignContent: 'center',
        backgroundColor: '#161d31',
    },
    destinationAvatar: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    destinationName: {
        color: '#fff',
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "Nunito-Regular",
    },
    avatar: {
        width: 90,
        height: 90,
        marginTop: 10,
        borderWidth: 3,
        borderRadius: 45,
        borderColor: 'white',
    },
    sendingLabel: {
        fontSize: 13,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Nunito-Regular",
    },
    destinationAmount: {
        flex: 1,
    },
    destinationComment: {
        flex: 3,
        justifyContent: 'center',
    },
    amount: {
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Nunito-Black",
    }
})