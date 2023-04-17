import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native'
import AvatarScroll from '../../ui/AvatarScroll';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarPicture from '../../ui/AvatarPicture';

export default function SendScreen({ route, navigation }) {

    const [text, setText] = useState('');
    const [contacts, setContacts] = useState([
        { uuid: 'f62706c5-2a0d-46cd-a157-f857bbb8eb2d', name: 'Juan Perez', phone: '+5491122334455', email: 'pepeconejito@gmail.com', source_uri: 'https://www.w3schools.com/howto/img_avatar.png', username: 'pepeconejito' },
    ]);
    const [amount, setAmount] = useState(route.params.amount);

    // Check if amount has no decimals and if not, add .00
    useEffect(() => {
        if (!amount.includes('.')) {
            setAmount(amount + '.00');
        }
    }, [amount]);

    // Load contacts on mount
    useEffect(() => {
        loadContacts();
    }, []);

    // Load LOCAL contacts (not phone contacts but AsyncStorage Contacts)
    const loadContacts = async () => {
        const contacts = await AsyncStorage.getItem('contacts');
        if (contacts) {
            setContacts(JSON.parse(contacts));
        }
    };

    // search for contacts on text change
    const search = (text) => {

        setText(text);

        // If text is empty, load all contacts
        if (text === '') {
            loadContacts();
            return;
        } else {
            // Serach on every contact name and phone and email and filter it
            const filteredContacts = contacts.filter((contact) => {
                return contact.name.toLowerCase().includes(text.toLowerCase()) ||
                    contact.username.toLowerCase().includes(text.toLowerCase()) ||
                    contact.phone.toLowerCase().includes(text.toLowerCase()) ||
                    contact.email.toLowerCase().includes(text.toLowerCase());
            });
        }

        // Set filtered contacts
        setContacts(filteredContacts);
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

    // Go to ConfirmSendScreen
    const handleSendMoney = ({ uuid = '' }) => {

        if (isEmail(text) || isPhoneNumber(text) || (text !== '' && text.trim().length >= 3)) {
            const destination = text;
            navigation.navigate('ConfirmSendScreen', { amount, destination });
        } else if (uuid !== '') {
            const destination = contacts.find((contact) => contact.uuid === uuid);
            navigation.navigate('ConfirmSendScreen', { amount, destination });
        } else {
            Alert.alert(
                'Error',
                'Por favor, seleccione un contacto o ingrese un correo electrónico, número de teléfono o nombre de usuario válido en el buscador.'
            );
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
                            <Text style={styles.contactNumber}>
                                {item.phone?.length > 0 ? item.phone : item.email}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>

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
                        placeholder="Buscar"
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

            <View style={{ backgroundColor: '#161d31' }}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSendMoney}>
                    <Text style={styles.buttonTextStyle}>ENVIAR ${amount}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#161d31',
    },
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
        color: '#fff',
        fontFamily: "Nunito-Regular",
    },
    amount: {
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Nunito-Black",
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
        color: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: '#7367f0',
    },
    buttonTextStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingVertical: 10,
        fontFamily: "Nunito-Regular",
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
        paddingHorizontal: 10,
        fontFamily: "Nunito-Regular",
    },
    contactView: {
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    contactName: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Nunito-Regular",
    },
    contactNumber: {
        fontSize: 14,
        color: '#7f8c8d',
        fontFamily: "Nunito-Medium",
    },
    contactAvatar: {
        marginRight: 10
    },
})