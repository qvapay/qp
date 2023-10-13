import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Pressable, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import Sound from 'react-native-sound'
import QPInput from '../../ui/QPInput'
import Modal from "react-native-modal"
import CompletedPayment from './CompletedPayment'
import { saveContact } from '../../../utils/Helpers'
import { globalStyles, theme } from '../../ui/Theme'
import QPSliderButton from '../../ui/QPSliderButton'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureSection from '../../ui/ProfilePictureSection'
import { transferBalance, checkUser } from '../../../utils/QvaPayClient'
import QPButton from '../../ui/QPButton'
import Toast from 'react-native-toast-message';

Sound.setCategory('Playback')
const ding = new Sound('paid.mp3', Sound.MAIN_BUNDLE)

export default function ConfirmSendScreen({ route }) {

    const navigation = useNavigation()
    const [user, setUser] = useState({})
    const [uuid, setUuid] = useState('')
    const [comment, setComment] = useState('')

    const { destination = '', amount } = route.params
    const [modalAmount, setModalAmount] = useState('');
    const [amountValue, setAmountValue] = useState(amount);
    const [sendingPayment, setSendingPayment] = useState(false)
    const [paymentCompleted, setPaymentCompleted] = useState(false)
    const [isModalVisible, setModalVisible] = useState(amount === 0);

    useEffect(() => {
        fetchUser()
        ding.setVolume(1)
        return () => { ding.release() }
    }, [])

    // Hide the header when payment is completed
    useEffect(() => {
        if (paymentCompleted) {
            navigation.setOptions({
                headerShown: false,
            })
        }
    }, [paymentCompleted])

    const playDone = () => { ding.play() }

    // Check if the user exists and save in the contacts
    const fetchUser = async () => {
        try {
            const response = await checkUser({ to: destination, navigation })
            setUser(response.user)
            saveContact(response.user)
        } catch (error) {
            console.log(error)
        }
    }

    // Confirm Send Money
    const handleConfirmSendMoney = async () => {

        if (!destination) {
            console.log('Invalid data')
            // TODO Toast invalid data
            return
        }

        if (!amountValue) {
            Toast.show({
                type: 'error',
                text1: 'Debe colocar una cantidad',
                position: 'bottom',
                bottomOffset: 10,
            });
            return
        }

        if (!comment) {
            Toast.show({
                type: 'error',
                text1: 'Debe colocar un mensaje',
                position: 'bottom',
                bottomOffset: 10,
            });
            return
        }

        setSendingPayment(true)

        try {
            const response = await transferBalance({ to: destination, amount: amountValue, comment, navigation })
            if (response && response.status && response.status === "paid" && response.uuid) {
                playDone()
                setUuid(response.uuid)
                setPaymentCompleted(true)
            } else {
                setSendingPayment(false)
                navigation.navigate('KeypadScreen')
            }
        } catch (error) {
            console.log(error)
            setSendingPayment(false)
            navigation.navigate('KeypadScreen')
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>
            {
                paymentCompleted ? (
                    <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate('HomeScreen')}>
                        <CompletedPayment uuid={uuid} />
                    </Pressable>
                ) : (
                    <>
                        {
                            sendingPayment ? (
                                // TODO replace for a Lottie
                                <ActivityIndicator color="white" size="large" style={{ flex: 1, marginTop: 10 }} />
                            ) : (
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={{ flex: 1, padding: 10 }}>
                                            <View style={styles.destinationAvatar}>
                                                <ProfilePictureSection user={user} />
                                            </View>
                                        </View>

                                        {
                                            // If amount is 0, show the modal to set the amount otherwise show the comment input
                                            amount === 0 ? (
                                                <Modal
                                                    animationType="slide"
                                                    transparent={true}
                                                    visible={isModalVisible}
                                                    onRequestClose={() => { setModalVisible(!isModalVisible) }}
                                                >
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                                                            <Text>Define la Cantidad:</Text>
                                                            <TextInput
                                                                placeholder="Cantidad"
                                                                keyboardType="numeric"
                                                                value={modalAmount}
                                                                onChangeText={setModalAmount}
                                                            />
                                                            <QPButton title="Confirmar" onPress={() => {
                                                                // Suponiendo que tienes un estado local para el valor del TextInput
                                                                setAmountValue(modalAmount);
                                                                setModalVisible(false);
                                                            }} />
                                                        </View>
                                                    </View>
                                                </Modal>
                                            ) : (
                                                <View style={styles.destinationComment}>
                                                    <QPInput
                                                        multiline={true}
                                                        style={styles.comment}
                                                        onChangeText={setComment}
                                                        placeholder={"Mensaje para " + user.name}
                                                        placeholderTextColor={theme.darkColors.contrast_text}
                                                    />
                                                </View>
                                            )
                                        }

                                    </ScrollView>

                                    <QPSliderButton title={`ENVIAR \$${amountValue}`} onSlideEnd={handleConfirmSendMoney} />

                                </View>
                            )
                        }
                    </>
                )
            }

            <Toast />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
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
        height: 150,
        width: '100%',
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    comment: {
        padding: 10,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontFamily: "Rubik-Regular",
    },
})