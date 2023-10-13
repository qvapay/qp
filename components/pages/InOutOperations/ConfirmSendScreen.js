import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Pressable, KeyboardAvoidingView, ScrollView, TextInput, Text } from 'react-native'
import Sound from 'react-native-sound'
import QPInput from '../../ui/QPInput'
import Modal from "react-native-modal"
import { AppContext } from '../../../AppContext';
import CompletedPayment from './CompletedPayment'
import { saveContact } from '../../../utils/Helpers'
import { globalStyles, theme } from '../../ui/Theme'
import QPSliderButton from '../../ui/QPSliderButton'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureSection from '../../ui/ProfilePictureSection'
import { transferBalance, checkUser } from '../../../utils/QvaPayClient'
import QPButton from '../../ui/QPButton'
import Toast from 'react-native-toast-message'
import LottieView from "lottie-react-native"

Sound.setCategory('Playback')
const ding = new Sound('paid.mp3', Sound.MAIN_BUNDLE)

export default function ConfirmSendScreen({ route }) {

    const navigation = useNavigation()
    const { me } = useContext(AppContext);
    const [user, setUser] = useState({})
    const [uuid, setUuid] = useState('')
    const [comment, setComment] = useState('')
    const { destination = '', amount } = route.params
    const [modalAmount, setModalAmount] = useState('');
    const [amountValue, setAmountValue] = useState(amount);
    const [sendingPayment, setSendingPayment] = useState(false)
    const [paymentCompleted, setPaymentCompleted] = useState(false)
    const [isModalVisible, setModalVisible] = useState(amount == 0);

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

    // Handle the amount input
    const handleChangeAmount = (text) => {
        // text cannot be greater than me.balance
        if (parseFloat(text) > parseFloat(me.balance)) {
            return
        }
        setModalAmount(text);
    };

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
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <LottieView source={require('../../../assets/lotties/sending.json')} autoPlay style={styles.lottie} />
                                </View>
                            ) : (
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={{ flex: 1, padding: 10 }}>
                                            <View style={styles.destinationAvatar}>
                                                <ProfilePictureSection user={user} />
                                            </View>
                                        </View>

                                        <View style={styles.destinationComment}>
                                            <QPInput
                                                multiline={true}
                                                style={styles.comment}
                                                onChangeText={setComment}
                                                placeholder={"Mensaje para " + user.name}
                                                placeholderTextColor={theme.darkColors.contrast_text}
                                            />
                                        </View>
                                    </ScrollView>

                                    <Modal
                                        isVisible={isModalVisible}
                                        animationIn={'slideInUp'}
                                        swipeDirection={['down']}
                                        style={styles.modalview}
                                    >
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={[styles.modalContent, { width: 300, borderRadius: 10 }]}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={styles.dolarSign}>$</Text>
                                                    <TextInput
                                                        value={modalAmount}
                                                        autoFocus={true}
                                                        cursorColor='white'
                                                        keyboardType="numeric"
                                                        onChangeText={handleChangeAmount}
                                                        style={[styles.amount, { color: amount == "0.00" ? theme.darkColors.elevation_light : 'white' }]}
                                                    />
                                                </View>

                                                <QPButton title="Confirmar" onPress={() => {
                                                    setAmountValue(modalAmount);
                                                    setModalVisible(false);
                                                }} />
                                            </View>
                                        </View>
                                    </Modal>

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
    lottie: {
        width: 160,
        height: 160,
        alignSelf: 'center',
    },
    modalview: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        backgroundColor: theme.darkColors.elevation,
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Rubik-Black',
    },
    dolarSign: {
        fontSize: 30,
        marginRight: 5,
        fontFamily: "Rubik-ExtraBold",
        color: theme.darkColors.elevation_light,
    },
})