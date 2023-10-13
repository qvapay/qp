import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Pressable, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import Sound from 'react-native-sound'
import QPInput from '../../ui/QPInput'
import CompletedPayment from './CompletedPayment'
import { saveContact } from '../../../utils/Helpers'
import { globalStyles, theme } from '../../ui/Theme'
import QPSliderButton from '../../ui/QPSliderButton'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureSection from '../../ui/ProfilePictureSection'
import { transferBalance, checkUser } from '../../../utils/QvaPayClient'

Sound.setCategory('Playback')
const ding = new Sound('paid.mp3', Sound.MAIN_BUNDLE)

export default function ConfirmSendScreen({ route }) {

    const navigation = useNavigation()
    const [user, setUser] = useState({})
    const { destination = '' } = route.params
    const [to] = useState(destination)
    const [uuid, setUuid] = useState('')
    const [amount] = useState(route.params.amount)
    const [comment, setComment] = useState('')
    const [sendingPayment, setSendingPayment] = useState(false)
    const [paymentCompleted, setPaymentCompleted] = useState(false)

    useEffect(() => {
        fetchUser()
        ding.setVolume(1)
        return () => { ding.release() }
    }, [])

    // Check for paymentCompleted with useEffect and hide topBar
    useEffect(() => {
        if (paymentCompleted) {
            navigation.setOptions({
                headerShown: false,
            })
        }
    }, [paymentCompleted])

    const playDone = () => { ding.play() }

    // Check if the user exists and save it to the contacts
    const fetchUser = async () => {
        const response = await checkUser({ to, navigation })
        setUser(response.user)
        saveContact(response.user)
    }

    // Confirm Send Money
    const handleConfirmSendMoney = async () => {

        if (!to || !amount || !comment) { return }
        
        setSendingPayment(true)

        // Now send balance via transferBalance method and check response
        const response = await transferBalance({ to, amount, comment, navigation })

        // Make a sound and change to payment completed animation
        if (response && response.status && response.status === "paid" && response.uuid) {
            playDone()
            setUuid(response.uuid)
            setPaymentCompleted(true)
        } else {
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
                                <ActivityIndicator color="white" size="large" style={{ flex: 1, marginTop: 10 }} />
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

                                    <QPSliderButton title={`ENVIAR \$${amount}`} onSlideEnd={handleConfirmSendMoney} />

                                </View>
                            )
                        }
                    </>
                )
            }
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