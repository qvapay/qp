import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import QPButton from '../../ui/QPButton';
import AvatarScroll from '../../ui/AvatarScroll';
import AvatarPicture from '../../ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkUser } from '../../../utils/QvaPayClient';
import { globalStyles, theme } from '../../ui/Theme';

export default function SendScreen({ route, navigation }) {

    const [text, setText] = useState('');
    const [contacts, setContacts] = useState([]);
    const [amount, setAmount] = useState(route.params.amount);

    // Check if amount has no decimals and if not, add .00
    useEffect(() => {
        if (!amount.includes('.')) {
            setAmount(amount + '.00');
        }
    }, [amount]);

    // Load LOCAL contacts (not phone contacts but AsyncStorage Contacts)
    const loadContacts = async () => {
        const contacts = await AsyncStorage.getItem('contacts');
        if (contacts) {
            setContacts(JSON.parse(contacts));
        }
    };

    // Load contacts on mount
    useEffect(() => {
        loadContacts();
    }, []);

    // search for contacts on text change
    const search = (text) => {
        setText(text);
    }

    // Validar si el valor proporcionado es un correo electrónico
    const isEmail = (text) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(text);
    };

    // Validar si el valor proporcionado es un número de teléfono
    const isPhoneNumber = (text) => {
        const regex = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/;
        return regex.test(text);
    };

    // validar que sea un username con @ delante
    const isUsername = (text) => {
        const regex = /^@([A-Za-z0-9_]{1,15})$/;
        return regex.test(text);
    };

    // Go to ConfirmSendScreen
    const handleSendMoney = async ({ uuid = '' } = {}) => {

        let destination = '';

        if (isEmail(text) || isPhoneNumber(text) || isUsername(text) || (text !== '' && text.trim().length >= 3)) {
            console.log(text)
            destination = text;
        } else if (uuid !== '') {
            destination = contacts.find((contact) => contact.uuid === uuid);
        } else {
            Alert.alert('Error', 'Por favor, seleccione un contacto o ingrese un correo electrónico, número de teléfono o nombre de usuario válido en el buscador.');
            return;
        }

        try {
            const response = await checkUser({ to: destination, navigation })
            if (response.user) {
                navigation.navigate('ConfirmSendScreen', { amount, destination })
            } else {
                Alert.alert('Error', 'El usuario no existe')
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El usuario no existe')
            return;
        }

    };

    // Extract item View for a more clean code
    const itemView = ({ item }) => {
        return (
            <Pressable onPress={() => { handleSendMoney(item) }} >
                <View style={styles.contactView}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.contactAvatar}>
                            <AvatarPicture source_uri={item.source_uri} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactNumber}>{item.username}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container, { justifyContent: 'flex-start' }]}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.sendingAmountContainer}>
                    <Text style={styles.sendingLabel}>Enviando...</Text>
                    <Text style={styles.amount}>$ {amount}</Text>
                </View>

                <View style={styles.sendingContactContainer}>

                    <View key={'fastDestinationSelector'} style={styles.avatarScroll}>
                        <AvatarScroll navigation={navigation} />
                    </View>

                    <View style={styles.searchBar}>
                        <FontAwesome5 name='search' size={12} color='#7f8c8d' />
                        <TextInput
                            onChangeText={search}
                            placeholder="Correo o username de destino"
                            placeholderTextColor="#7f8c8d"
                            style={styles.searchBarText}
                        />
                    </View>

                    <View key={'destinationContactList'}>
                        <FlatList
                            data={contacts}
                            keyExtractor={(item) => item.uuid}
                            renderItem={({ item }) => itemView({ item })}
                        />
                    </View>
                </View>

            </ScrollView>

            <QPButton title={`ENVIAR \$${amount}`} onPress={handleSendMoney} />

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    sendingAmountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingContactContainer: {
        flex: 6,
        justifyContent: 'flex-start',
    },
    sendingLabel: {
        alignSelf: 'center',
        fontSize: 13,
        color: 'white',
        fontFamily: "Rubik-Regular",
    },
    amount: {
        fontSize: 40,
        color: 'white',
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
    },
    contactPickerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        height: 40,
        borderWidth: 0,
        color: 'white',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: theme.darkColors.primary,
    },
    buttonTextStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 10,
        fontFamily: "Rubik-Regular",
    },
    searchBar: {
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    searchBarText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        textTransform: 'none',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
    },
    contactView: {
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    contactName: {
        color: 'white',
        fontSize: 16,
        fontFamily: "Rubik-Regular",
    },
    contactNumber: {
        fontSize: 14,
        color: '#7f8c8d',
        fontFamily: "Rubik-Medium",
    },
    contactAvatar: {
        marginRight: 10
    },
})